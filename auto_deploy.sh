#!/bin/bash
# Auto Deploy Script for Magic Carnation

echo "🚀 Starting Auto Deploy to GitHub..."

# إضافة مسارات الأدوات
export PATH="$PATH:/c/Program Files/Git/bin:/c/Program Files/GitHub CLI"

# التحقق من حالة Git
echo "📁 Checking Git status..."
git status

# إضافة جميع الملفات
echo "📦 Adding all files..."
git add .

# حفظ التحديثات
echo "💾 Committing changes..."
git commit -m "Auto deploy: Magic Carnation website updates $(date)"

# محاولة رفع على GitHub
echo "🌐 Pushing to GitHub..."
if git push origin master 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "⚠️  Setting up GitHub repository..."
    
    # إنشاء repository جديد
    gh repo create magic-carnation-website --public --description "Magic Carnation TikTok Agency Website" --source=. --remote=origin --push --confirm
    
    if [ $? -eq 0 ]; then
        echo "✅ Repository created and pushed successfully!"
        echo "🔗 Repository URL: https://github.com/USERNAME/magic-carnation-website"
    else
        echo "❌ Failed to create repository. Please check GitHub authentication."
        echo "Run: gh auth login"
    fi
fi

echo "🎉 Auto deploy completed!"
