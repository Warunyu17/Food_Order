/* ---------- setup ---------- */
const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const path    = require('path');
const multer  = require('multer');
const bcrypt = require('bcrypt');

const app  = express();
const port = 3001;

/* ---------- middleware ---------- */
app.use(cors());
app.use(express.json());

/* serve static image files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ---------- multer for image upload ---------- */
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename:   (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* ---------- MySQL ---------- */
require('dotenv').config();

const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

/* ---------- API ---------- */

app.get('/menus', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) return res.status(500).send('error');
    res.json(results);
  });
});

app.post('/menu', upload.single('image'), (req, res) => {
  const { name, price, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  db.query(
    'INSERT INTO menu (name, price, description, image_url) VALUES (?, ?, ?, ?)',
    [name, price, description, image_url],
    err => {
      if (err) return res.status(500).send('error');
      res.sendStatus(200);
    }
  );
});

app.post('/order', (req, res) => {
  const { customer, items, note } = req.body;
  db.query(
    'INSERT INTO orders (customer, items, note) VALUES (?, ?, ?)',
    [customer, JSON.stringify(items), note || '-'],
    err => {
      if (err) return res.status(500).send('error');
      res.sendStatus(200);
    }
  );
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status(500).send('error');
    res.json(results);
  });
});

app.delete('/order/:id', (req, res) => {
  db.query('DELETE FROM orders WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send('error');
    res.sendStatus(200);
  });
});

app.delete('/menu/:id', (req, res) => {
  db.query('DELETE FROM menu WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send('error');
    res.sendStatus(200);
  });
});

app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ success: false });

  try {
    const ok = await bcrypt.compare(password, process.env.ADMIN_HASH);
    return res.json({ success: ok });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ---------- RUNNING ---------- */
const PORT = process.env.PORT || 3001;
app.listen(port, () => console.log('Server running on ' + port));