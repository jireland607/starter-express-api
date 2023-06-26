const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const app = express();
app.use(bodyParser.text());

app.put('/api/convert-to-pdf', (req, res) => {
  const html = req.body;
  
  // Convert HTML to PDF
  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error converting HTML to PDF');
    } else {
      // Convert PDF buffer to base64
      const base64 = buffer.toString('base64');
      res.send(base64);
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
