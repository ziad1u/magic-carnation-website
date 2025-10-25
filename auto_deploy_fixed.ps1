# Auto Deploy Script for Magic Carnation - PowerShell Version

Write-Host "Starting Auto Deploy to GitHub..." -ForegroundColor Green

# إضافة مسارات الأدوات
$env:PATH += ";C:\Program Files\Git\bin;C:\Program Files\GitHub CLI"

# التحقق من حالة Git
Write-Host "Checking Git status..." -ForegroundColor Yellow
git status

# إضافة جميع الملفات
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

# حفظ التحديثات
Write-Host "Committing changes..." -ForegroundColor Yellow
$commitMessage = "Auto deploy: Magic Carnation website updates $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage

# محاولة رفع على GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow

# محاولة الرفع العادي
git push origin master 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Setting up GitHub repository..." -ForegroundColor Yellow
    
    # إنشاء repository جديد
    gh repo create magic-carnation-website --public --description "Magic Carnation TikTok Agency Website" --source=. --remote=origin --push --confirm
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Repository created and pushed successfully!" -ForegroundColor Green
        Write-Host "Repository URL: https://github.com/USERNAME/magic-carnation-website" -ForegroundColor Cyan
    } else {
        Write-Host "Failed to create repository. Please check GitHub authentication." -ForegroundColor Red
        Write-Host "Run: gh auth login" -ForegroundColor Yellow
    }
}

Write-Host "Auto deploy completed!" -ForegroundColor Green

