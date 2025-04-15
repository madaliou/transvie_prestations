const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'root',
  database: 'transvie'
});

db.connect((err) => {
  if (err) throw err;
  console.log('🟢 Connecté à MySQL');
});

app.post('/api/prestations', (req, res) => {
    const { agenceId, prestationId, date, cout } = req.body;
  
    const sql = 'INSERT INTO prestations (agence_id, prestation_id, date, cout) VALUES (?, ?, ?, ?)';
    db.query(sql, [agenceId, prestationId, date, cout], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: '✅ Prestation enregistrée avec succès !' });
    });
  });
app.get('/api/agences', (req, res) => {
db.query('SELECT * FROM agences', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
});
});

app.get('/api/prestations-types', (req, res) => {
db.query('SELECT * FROM types_prestations', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
});
});

app.post('/api/agences', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom de l’agence est requis.' });
  
    const sql = 'INSERT INTO agences (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: '✅ Agence ajoutée avec succès', id: result.insertId, name });
    });
  });

  app.post('/api/prestations-types', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom de la prestation est requis.' });
  
    const sql = 'INSERT INTO types_prestations (name) VALUES (?)'; // ou prestations_types selon ta BDD
    db.query(sql, [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: '✅ Type de prestation ajouté avec succès', id: result.insertId, name });
    });
  });

  app.get('/api/prestations', (req, res) => {
    const sql = `
      SELECT 
        p.id,
        a.name AS agence,
        t.name AS prestation,
        p.date,
        p.cout
      FROM prestations p
      JOIN agences a ON p.agence_id = a.id
      JOIN types_prestations t ON p.prestation_id = t.id
      ORDER BY p.date DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des prestations :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
    });
  });

  app.get('/api/kpis', (req, res) => {
    const sql = `
      SELECT 
        a.name AS agence, 
        p.name AS prestation, 
        COUNT(*) AS count,
        DATE(p.date) AS date
      FROM prestations prest
      JOIN agences a ON prest.agence_id = a.id
      JOIN prestations_types p ON prest.prestation_id = p.id
      GROUP BY a.name, p.name, DATE(p.date)
      ORDER BY DATE(p.date) DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des KPIs :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
    });
  });
  
  
    

app.listen(3001, () => console.log('🚀 Backend en ligne sur http://localhost:3001'));
