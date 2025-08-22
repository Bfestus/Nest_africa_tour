# Script to update all blog files with proper favicon setup

$blogFiles = Get-ChildItem -Path "blogs" -Filter "*.html"

foreach ($file in $blogFiles) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if favicon is already properly setup
    if ($content -notmatch 'favicon\.ico') {
        # Find the title tag end
        $titleEnd = $content.IndexOf("</title>")
        if ($titleEnd -gt 0) {
            $insertPoint = $titleEnd + "</title>".Length
            
            $faviconBlock = @"

    
    <!-- Comprehensive Favicon Setup -->
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="../favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
    <meta name="msapplication-TileImage" content="../apple-touch-icon.png">
    <meta name="msapplication-TileColor" content="#2d5a27">
    <meta name="theme-color" content="#2d5a27">
"@
            
            $content = $content.Insert($insertPoint, $faviconBlock)
            
            # Save the file
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Updated $($file.Name) with favicon setup"
        }
    } else {
        Write-Host "$($file.Name) already has favicon setup"
    }
}

Write-Host "`nAll blog files have been updated with comprehensive favicon setup!"
