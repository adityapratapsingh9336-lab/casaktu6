import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

new_header = """<header class="top-header">
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
    </header>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace header. We match from <header class="top-header"> to </header>
    content = re.sub(r'<header class="top-header">.*?</header>', new_header, content, flags=re.DOTALL)
    
    # Add theme toggle to navbar if not already there
    if 'class="theme-toggle"' not in content:
        content = re.sub(r'(</ul>)', r'\1\n            <button class="theme-toggle" aria-label="Toggle Dark Mode"><i class="ph ph-moon"></i></button>', content)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated all HTML files.")
