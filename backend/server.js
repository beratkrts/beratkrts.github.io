const express = require('express');
const excel = require('exceljs');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://beratkrts.github.io/' // Replace with your frontend URL
}));

// Array to store submitted survey data
let surveyData = [];

// Route to handle form submissions
app.post('/submit-survey', (req, res) => {
  const formData = req.body;

  // Perform validation
  if (!isValidFormData(formData)) {
    return res.status(400).send('Invalid form data');
  }

  // Store the valid survey data
  surveyData.push(formData);
  res.send('Survey submitted successfully!');
});

// Validate form data function
function isValidFormData(formData) {
  // Perform validation here, e.g., check if all required fields are present
  // You can also validate individual fields, e.g., check if age is a number, etc.
  if (!formData.gender || !formData.age || !formData.faculty || !formData.phoneRankings) {
    return false;
  }

  // Add more validation as needed

  return true;
}

// Route to export survey data to Excel
app.get('/export-excel', (req, res) => {
  if (surveyData.length === 0) {
    return res.status(404).send('No survey data available');
  }

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Survey Data');
  
  // Add headers
  worksheet.addRow(['Gender', 'Age', 'Faculty', 'Phone Rankings']);

  // Add data rows
  surveyData.forEach(data => {
    const { gender, age, faculty, phoneRankings } = data;
    worksheet.addRow([gender, age, faculty, phoneRankings.join(', ')]);
  });

  // Save the workbook to a file
  const filePath = 'survey_data.xlsx';
  workbook.xlsx.writeFile(filePath)
    .then(() => {
      res.download(filePath); // Send the file as a download
    })
    .catch(err => {
      console.error('Error exporting Excel file:', err);
      res.status(500).send('Error exporting Excel file');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
