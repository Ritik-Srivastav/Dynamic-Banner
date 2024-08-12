const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const port = 5000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ritik@123',
  database: 'banner_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors());
app.use(bodyParser.json());

// API to get banner settings
app.get('/api/banner', (req, res) => {
  const query = 'SELECT * FROM banner_settings WHERE id = 1'; // Assuming one row for simplicity
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// API to update banner settings
app.post('/api/banner', (req, res) => {
  const { description, timer, link, visible } = req.body;
  const query = `
    UPDATE banner_settings 
    SET description = ?, timer = ?, link = ?, visible = ? 
    WHERE id = 1
  `;
  db.query(query, [description, timer, link, visible], (err) => {
    if (err) throw err;
    res.send('Banner settings updated');
  });
});

//static files
app.use(express.static(path.join(__dirname,'./banner-frontend/build')));

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, "./banner-frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
