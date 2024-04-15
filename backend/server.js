const express = require('express');
const excel = require('exceljs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle form submissions
app.post('/submit', (req, res) => {
  const data = req.body;

  // Create a new Excel workbook
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Survey Data');

  // Add headers to the worksheet
  worksheet.addRow(['Gender', 'Age', 'Faculty', ...phones]);

  // Add form data to the worksheet
  worksheet.addRow([
    data.gender,
    data.age,
    data.faculty,
    ...Object.keys(data)
      .filter(key => key.startsWith('phone'))
      .map(key => data[key])
  ]);

  // Save the workbook to a file
  const filePath = path.join(__dirname, 'survey_data.xlsx');
  workbook.xlsx.writeFile(filePath)
    .then(() => {
      console.log('Survey data saved to', filePath);
      res.status(200).send('Survey data saved successfully');
    })
    .catch(err => {
      console.error('Error saving survey data:', err);
      res.status(500).send('Error saving survey data');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
