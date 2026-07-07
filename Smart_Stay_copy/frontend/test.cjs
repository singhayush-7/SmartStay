const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  
  const computedStyle = await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (!btn) return null;
    return {
      className: btn.className,
      padding: window.getComputedStyle(btn).padding,
      backgroundColor: window.getComputedStyle(btn).backgroundColor,
      borderRadius: window.getComputedStyle(btn).borderRadius,
      boxShadow: window.getComputedStyle(btn).boxShadow,
      borderStyle: window.getComputedStyle(btn).borderStyle
    };
  });
  
  console.log('Button computed styles:', computedStyle);
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
