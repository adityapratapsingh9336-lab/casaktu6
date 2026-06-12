$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = [IO.File]::ReadAllText($file.FullName)
    $content = $content -replace '"\./css/styles\.css"', '"css/styles.css"'
    $content = $content -replace '"\./js/script\.js"', '"js/script.js"'
    $content = $content -replace '"\./assets/images/cas-logo\.png"', '"assets/images/cas-logo.png"'
    $content = $content -replace '"\./assets/images/aktu-logo\.png"', '"assets/images/aktu-logo.png"'
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
Write-Output "Paths updated to remove ./"
