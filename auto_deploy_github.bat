@echo off
echo 🚀 رفع تلقائي على GitHub...
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
git commit -m "Auto deploy: Magic Carnation website updates"

echo.
echo 🌐 محاولة رفع على GitHub...

REM محاولة الرفع على main
git push origin main 2>nul
if %errorlevel% neq 0 (
    REM محاولة الرفع على master
    git push origin master 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo ⚠️  لم يتم الرفع تلقائياً. يرجى إنشاء repository أولاً:
        echo.
        echo 1. اذهب إلى: https://github.com/new
        echo 2. أنشئ repository باسم: magic-carnation-website
        echo 3. ثم استخدم الأوامر التالية:
        echo.
        echo    git remote add origin https://github.com/USERNAME/magic-carnation-website.git
        echo    git branch -M main
        echo    git push -u origin main
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
