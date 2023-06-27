const express = require('express');
const app = express();
const service = require('./service')
app.use(express.json());

app.get("/test", service.hello_world);
app.post("/pdf", service.generate_pdf);

app.listen(3000, ()=> {
    console.log(`project running on port 3000`);
});




const puppeteer = require('puppeteer');
const fs = require('fs');



(async () => {

    // Create a browser instance
    const browser = await puppeteer.launch();
  
    // Create a new page
    const page = await browser.newPage();
  
    //Get HTML content from HTML file

  
  
    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');
  
    // Downlaod the PDF
    const pdf = await page.pdf({
      path: 'result.pdf',
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
  
    // Close the browser instance
    await browser.close();
  })();