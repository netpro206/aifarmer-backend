const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Example endpoint
app.get('/api/crop/:name', (req, res) => {
  const cropName = req.params.name.toLowerCase();
  const filePath = path.join(__dirname, 'data', `${cropName}.json`);

  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } else {
    res.status(404).json({ error: 'Crop not found' });
  }
});

app.get('/', (req, res) => {
  res.send('AI Farmer Osim backend is running! 🚜');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});