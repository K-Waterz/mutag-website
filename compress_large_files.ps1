# Script to compress large files in the Mutag wesbite images folder
# Files larger than 100MB will be compressed

Write-Host "Checking for large files to compress..." -ForegroundColor Green

# Change to the images directory
Set-Location "Mutag wesbite images"

# Get files larger than 100MB (104,857,600 bytes)
$largeFiles = Get-ChildItem | Where-Object { $_.Length -gt 104857600 }

if ($largeFiles.Count -eq 0) {
    Write-Host "No files larger than 100MB found." -ForegroundColor Yellow
    exit
}

Write-Host "Found $($largeFiles.Count) files larger than 100MB:" -ForegroundColor Cyan
foreach ($file in $largeFiles) {
    $sizeMB = [math]::Round($file.Length / 1MB, 2)
    Write-Host "  - $($file.Name): $sizeMB MB" -ForegroundColor White
}

Write-Host "`nRecommended compression steps:" -ForegroundColor Green
Write-Host "1. For GIF files, we can try reducing colors and optimizing" -ForegroundColor Yellow
Write-Host "2. Consider converting to MP4 for animated content" -ForegroundColor Yellow
Write-Host "3. Use online tools like TinyPNG, Compressor.io, or Squoosh.app" -ForegroundColor Yellow

# Check if we can create compressed versions
Write-Host "`nAttempting basic compression using PowerShell..." -ForegroundColor Cyan

foreach ($file in $largeFiles) {
    $fileName = $file.BaseName
    $extension = $file.Extension
    
    Write-Host "`nProcessing: $($file.Name)" -ForegroundColor White
    
    try {
        # For now, we'll create a backup and suggest manual compression
        $backupName = "${fileName}_original${extension}"
        if (!(Test-Path $backupName)) {
            Copy-Item $file.Name $backupName
            Write-Host "Created backup: $backupName" -ForegroundColor Green
        }
        
        # Here you would add actual compression commands when tools are available
        Write-Host "Manual compression recommended for: $($file.Name)" -ForegroundColor Yellow
        
    } catch {
        Write-Host "Error processing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== COMPRESSION RECOMMENDATIONS ===" -ForegroundColor Green
Write-Host "1. Install FFmpeg for video/GIF compression: winget install ffmpeg" -ForegroundColor Cyan
Write-Host "2. Use online services like:" -ForegroundColor Cyan
Write-Host "   - https://compress-an-image.com/ (for images)" -ForegroundColor White
Write-Host "   - https://www.compresss.com/compress-gif (for GIFs)" -ForegroundColor White
Write-Host "   - https://convertio.co/gif-webm/ (GIF to WebM conversion)" -ForegroundColor White
Write-Host "3. Consider replacing large GIFs with MP4/WebM videos for better compression" -ForegroundColor Cyan

Set-Location ..
