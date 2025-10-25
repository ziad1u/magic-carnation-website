# Cursor Auto Deploy Configuration

## إعداد الرفع التلقائي من Cursor:

### 1. إضافة Task في Cursor:
- اضغط `Ctrl+Shift+P`
- اكتب: "Tasks: Configure Task"
- اختر: "Create tasks.json from template"
- اختر: "Others"

### 2. إضافة المهمة التالية:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Deploy to GitHub",
            "type": "shell",
            "command": "powershell",
            "args": ["-ExecutionPolicy", "Bypass", "-File", "auto_deploy_fixed.ps1"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": []
        }
    ]
}
```

### 3. تشغيل الرفع التلقائي:
- اضغط `Ctrl+Shift+P`
- اكتب: "Tasks: Run Task"
- اختر: "Deploy to GitHub"

### 4. أو استخدم الاختصار:
- اضغط `Ctrl+Shift+B`
- اختر: "Deploy to GitHub"

## الملفات الجاهزة:
- ✅ `auto_deploy_fixed.ps1` - سكريبت الرفع التلقائي
- ✅ `package-deploy.json` - تكوين npm للرفع
- ✅ جميع التحديثات محفوظة في Git

## التحديثات المرفوعة:
✅ إصلاح دالة الترجمة في جميع الصفحات
✅ ترجمة كاملة لصفحة "Join Agency (Online)"
✅ إضافة مساحة بين عنصري "معرض الأعمال" و "وكيل"
✅ إصلاح أسماء منصات التواصل الاجتماعي
✅ إضافة مفاتيح ترجمة جديدة للبلدان

---
**الرفع التلقائي جاهز من Cursor!** 🚀

