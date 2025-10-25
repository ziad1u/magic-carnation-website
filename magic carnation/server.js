image.pngress = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const cors = require('cors');
const { XSquareIcon } = require('lucide-react');
const upload = multer();

const app = express();
app.use(cors());

app.post('/api/send-cv', upload.single('cv'), async (req, res) => {
  const { caption } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const formData = new FormData();
  formData.append('chat_id', '5171095071');
  formData.append('document', file.buffer, file.originalname);
  formData.append('caption', caption);

  try {
    const tgRes = await fetch('https://api.telegram.org/bot7949938067:AAE1zd9EEhA2OCO7jYanN5LqTUDfvtSacIo/sendDocument', {
      method: 'POST',
      body: formData
    });
    const tgData = await tgRes.json();
    res.json(tgData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send to Telegram', details: err.message });
  }
});

app.listen(3001, () => {
  console.log('Backend proxy running on http://localhost:3001');
});