$files = Get-ChildItem -Path . -Filter *.html

$newHeader = @"
    <header class="top-header">
        <div class="container">
            <div class="logo-container" style="background: transparent; border-radius: 0;">
                <img src="./assets/images/cas-logo.png" alt="CAS Logo">
            </div>
            
            <div class="header-text">
                <h1>Centre for Advanced Studies</h1>
                <div class="subtitle">Dr. A.P.J. Abdul Kalam Technical University, Lucknow</div>
            </div>
            
            <div class="logo-container" style="background: transparent; border-radius: 0;">
                <img src="./assets/images/aktu-logo.png" alt="AKTU Logo">
            </div>
        </div>
    </header>
"@

foreach ($file in $files) {
    if ($file.Name -eq "index.html") { continue }
    $content = [IO.File]::ReadAllText($file.FullName)
    
    # Replace header
    $content = $content -replace '(?s)<header class="top-header">.*?</header>', $newHeader
    
    # Add theme toggle to navbar
    if (-not $content.Contains('class="theme-toggle"')) {
        $content = $content -replace '(?s)(</ul>)', "`$1`n            <button class=`"theme-toggle`" aria-label=`"Toggle Dark Mode`"><i class=`"ph ph-moon`"></i></button>"
    }
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
Write-Output "Updated HTML files."
