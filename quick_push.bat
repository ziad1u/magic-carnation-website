@echo off
echo 🚀 رفع سريع على GitHub...
echo.

REM إضافة مسارات الأدوات
set PATH=%PATH%;C:\Program Files\Git\bin

echo 📁 التحقق من حالة Git...
git status

echo.
echo 📦 إضافة جميع الملفات...
git add .

echo.
echo 💾 حفظ التحديثات...
git commit -m "Last project update"

echo.
echo 🌐 محاولة رفع على GitHub...
echo إذا لم يكن لديك repository، سيتم إنشاؤه...

REM محاولة الرفع
git push origin main 2>nul
if %errorlevel% neq 0 (
    git push origin master 2>nul
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
        echo git push -u origin main
        echo.
        pause
    ) else (
        echo.
        echo ✅ تم الرفع بنجاح على GitHub!
    )
) else (
    echo.
    echo ✅ تم الرفع بنجاح على GitHub!
)

pause
