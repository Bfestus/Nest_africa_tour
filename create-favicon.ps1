# PowerShell script to create favicon from logo
# This script will copy and rename the logo for favicon use

Write-Host "Creating favicon from logo..."

# Copy the logo file to create a favicon
Copy-Item "images/logo/logo.jpg" "favicon.ico"
Copy-Item "images/logo/logo.jpg" "apple-touch-icon.png"
Copy-Item "images/logo/logo.jpg" "favicon-32x32.png"
Copy-Item "images/logo/logo.jpg" "favicon-16x16.png"

Write-Host "Favicon files created successfully!"
Write-Host "- favicon.ico (main favicon)"
Write-Host "- apple-touch-icon.png (for iOS devices)"
Write-Host "- favicon-32x32.png (32x32 pixel version)"
Write-Host "- favicon-16x16.png (16x16 pixel version)"

Write-Host ""
Write-Host "Note: For best results, consider converting your logo to ICO format using an online tool."
Write-Host "Recommended sizes: 16x16, 32x32, 48x48 pixels in ICO format."
