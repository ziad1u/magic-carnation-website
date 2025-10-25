import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// إعدادات CORS محسنة
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-domain.com'],
  credentials: true
}));

// إعدادات JSON و URL-encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// إعدادات Multer للملفات الكبيرة
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: function (req, file, cb) {
    // السماح بأنواع الملفات المختلفة
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم'));
    }
  }
});

// مجلد للفيديوهات
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const videoDir = 'public/videos/';
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }
    cb(null, videoDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB للفيديوهات
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('يجب أن يكون الملف فيديو'));
    }
  }
});

// API لإرسال السيرة الذاتية
app.post('/api/send-cv', upload.single('cv'), async (req, res) => {
  try {
    const { caption, name, email, phone } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
    }

    const formData = new FormData();
    formData.append('chat_id', '5171095071');
    formData.append('document', file.buffer, file.originalname);
    
    const message = `
📄 سيرة ذاتية جديدة

👤 الاسم: ${name || 'غير محدد'}
📧 البريد الإلكتروني: ${email || 'غير محدد'}
📱 الهاتف: ${phone || 'غير محدد'}

📝 الرسالة:
${caption || 'لا توجد رسالة'}

📎 الملف: ${file.originalname}
📏 الحجم: ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;
    
    formData.append('caption', message);

    const tgRes = await fetch('https://api.telegram.org/bot7949938067:AAE1zd9EEhA2OCO7jYanN5LqTUDfvtSacIo/sendDocument', {
      method: 'POST',
      body: formData
    });
    
    const tgData = await tgRes.json();
    
    if (tgData.ok) {
      res.json({ 
        success: true, 
        message: 'تم إرسال السيرة الذاتية بنجاح',
        fileId: tgData.result.document.file_id
      });
    } else {
      res.status(400).json({ 
        error: 'فشل في الإرسال', 
        details: tgData.description 
      });
    }
  } catch (err) {
    console.error('خطأ في إرسال السيرة الذاتية:', err);
    res.status(500).json({ 
      error: 'خطأ في الخادم', 
      details: err.message 
    });
  }
});

// API لرفع الفيديوهات
app.post('/api/upload-video', videoUpload.single('video'), async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'لم يتم رفع أي فيديو' });
    }

    // إنشاء رابط الوصول للفيديو
    const videoUrl = `/videos/${file.filename}`;
    
    res.json({
      success: true,
      message: 'تم رفع الفيديو بنجاح',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: videoUrl,
      mimetype: file.mimetype
    });
  } catch (err) {
    console.error('خطأ في رفع الفيديو:', err);
    res.status(500).json({ 
      error: 'خطأ في رفع الفيديو', 
      details: err.message 
    });
  }
});

// API لرفع الملفات بتقسيم (Chunked Upload)
app.post('/api/upload-chunk', upload.single('chunk'), async (req, res) => {
  try {
    const { chunkIndex, totalChunks, fileName } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'لم يتم رفع أي جزء' });
    }

    const chunkDir = `uploads/chunks/${fileName}`;
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }

    const chunkPath = path.join(chunkDir, `chunk-${chunkIndex}`);
    fs.writeFileSync(chunkPath, file.buffer);

    res.json({
      success: true,
      chunkIndex: parseInt(chunkIndex),
      message: `تم رفع الجزء ${chunkIndex + 1} من ${totalChunks}`
    });
  } catch (err) {
    console.error('خطأ في رفع الجزء:', err);
    res.status(500).json({ 
      error: 'خطأ في رفع الجزء', 
      details: err.message 
    });
  }
});

// API لدمج الأجزاء
app.post('/api/merge-chunks', async (req, res) => {
  try {
    const { fileName, totalChunks } = req.body;
    const chunkDir = `uploads/chunks/${fileName}`;
    const outputPath = `uploads/${fileName}`;

    // إنشاء ملف الإخراج
    const writeStream = fs.createWriteStream(outputPath);

    // دمج الأجزاء
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(chunkDir, `chunk-${i}`);
      const chunkData = fs.readFileSync(chunkPath);
      writeStream.write(chunkData);
    }

    writeStream.end();

    // تنظيف مجلد الأجزاء
    fs.rmSync(chunkDir, { recursive: true, force: true });

    res.json({
      success: true,
      message: 'تم دمج الأجزاء بنجاح',
      fileName: fileName,
      path: outputPath
    });
  } catch (err) {
    console.error('خطأ في دمج الأجزاء:', err);
    res.status(500).json({ 
      error: 'خطأ في دمج الأجزاء', 
      details: err.message 
    });
  }
});

// API للحصول على قائمة الفيديوهات
app.get('/api/videos', (req, res) => {
  try {
    const videosDir = 'public/videos/';
    if (!fs.existsSync(videosDir)) {
      return res.json({ videos: [] });
    }

    const files = fs.readdirSync(videosDir);
    const videos = files
      .filter(file => /\.(mp4|webm|ogg)$/i.test(file))
      .map(file => {
        const filePath = path.join(videosDir, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          url: `/videos/${file}`,
          size: stats.size,
          created: stats.birthtime
        };
      });

    res.json({ videos });
  } catch (err) {
    console.error('خطأ في جلب الفيديوهات:', err);
    res.status(500).json({ 
      error: 'خطأ في جلب الفيديوهات', 
      details: err.message 
    });
  }
});

// API لحذف فيديو
app.delete('/api/video/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const videoPath = path.join('public/videos/', filename);
    
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
      res.json({ 
        success: true, 
        message: 'تم حذف الفيديو بنجاح' 
      });
    } else {
      res.status(404).json({ 
        error: 'الفيديو غير موجود' 
      });
    }
  } catch (err) {
    console.error('خطأ في حذف الفيديو:', err);
    res.status(500).json({ 
      error: 'خطأ في حذف الفيديو', 
      details: err.message 
    });
  }
});

// API للتحقق من حالة الخادم
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '2.0.0'
  });
});

// خدمة الملفات الثابتة
app.use('/videos', express.static('public/videos'));
app.use('/uploads', express.static('uploads'));

// معالج الأخطاء العام
app.use((err, req, res, next) => {
  console.error('خطأ عام:', err);
  res.status(500).json({
    error: 'خطأ داخلي في الخادم',
    message: err.message
  });
});

// معالج 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'المسار غير موجود',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
  console.log(`📁 مجلد الفيديوهات: public/videos/`);
  console.log(`📄 مجلد الرفع: uploads/`);
  console.log(`🔧 الحد الأقصى للملف: 100MB`);
  console.log(`🎬 الحد الأقصى للفيديو: 500MB`);
});