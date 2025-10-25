@echo off
echo 🚀 رفع Magic Carnation على GitHub...
echo.

REM إضافة مسارات الأدوات
set PATH=%PATH%;C:\Program Files\Git\bin;C:\Program Files\GitHub CLI

echo 📁 التحقق من حالة Git...
git status

echo.
echo 📦 إضافة الملفات الجديدة...
git add .

echo.
echo 💾 حفظ التحديثات...
git commit -m "Add quick deploy instructions"

echo.
echo 🌐 محاولة رفع على GitHub...
echo إذا لم تكن مسجل الدخول، سيتم فتح المتصفح للتسجيل...

REM محاولة إنشاء repository على GitHub
gh repo create magic-carnation-website --public --description "Magic Carnation TikTok Agency Website" --source=. --remote=origin --push --confirm 2>nul

if %errorlevel% neq 0 (
    echo.
    echo ⚠️  لم يتم الرفع تلقائياً. يرجى اتباع التعليمات اليدوية:
    echo.
    echo 1. اذهب إلى: https://github.com/new
    echo 2. أنشئ repository باسم: magic-carnation-website
    echo 3. ارفع الملفات من مجلد المشروع
    echo.
    echo أو استخدم الأوامر التالية:
    echo git remote add origin https://github.com/USERNAME/magic-carnation-website.git
    echo git push -u origin master
    echo.
    pause
) else (
    echo.
    echo ✅ تم الرفع بنجاح على GitHub!
    echo 🔗 Repository: https://github.com/USERNAME/magic-carnation-website
)

pause

