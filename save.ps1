param([string]$message = "Update project files")

Write-Host "🔄 Збереження проекту..." -ForegroundColor Yellow

try {
    git add .
    git commit -m "$message"
    git push
    
    Write-Host "✅ Проект успішно збережено!" -ForegroundColor Green
    Write-Host "📝 Коміт: $message" -ForegroundColor Cyan
    Write-Host "🔗 GitHub: https://github.com/druseyou/chicken-road-project" -ForegroundColor Blue
} catch {
    Write-Host "❌ Помилка: $_" -ForegroundColor Red
}
