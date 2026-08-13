const { chromium } = require('playwright');
const fs = require('fs');
const marked = require('marked');

(async () => {
    try {
        const mdContent = fs.readFileSync('Test_Flows.md', 'utf8');
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                    h1, h2, h3 { color: #333; }
                    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
                    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
                </style>
            </head>
            <body>
                ${marked.parse(mdContent)}
            </body>
            </html>
        `;

        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle' });
        await page.pdf({ path: 'Test_Flows.pdf', format: 'A4', margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' } });
        await browser.close();
        console.log('Successfully generated Test_Flows.pdf!');
    } catch (e) {
        console.error('Failed to generate PDF:', e);
    }
})();
