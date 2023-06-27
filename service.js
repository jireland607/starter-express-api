const puppeteer = require("puppeteer");
const fs = require("fs");


exports.hello_world = async (req, res) => res.send('Hello World');

exports.generate_pdf = async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let html = await ` ${fs.readFileSync(`./HSD118sample.html`, "utf8")}` ;

  let css = await ` <style> ${fs.readFileSync(`./stylesheet.css`, "utf8")} </style>  ` ;
  await page.setContent(css, { waitUntil: "domcontentloaded" });

  console.log(css);

html = html.replace("</head>", css + "</head>");
await page.setContent(html, { waitUntil: "domcontentloaded" });
console.log(html.substring(1,5000));

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,

    headerTemplate: ``,
    footerTemplate: '<footer><h5>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h5></footer>',
    margin: { top: "10px", bottom: "10px", right: "20px", left: "20px"},
  });

  //  SENDING BACK PDF IN RESPONCE TO API CALL
  res.contentType("application/pdf");
  res.send(pdf);
};