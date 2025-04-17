require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use('/api', authenticate);

const SECRET = process.env.JWT_SECRET;
/* const db = mysql.createConnection({
  host: 'localhost',
  user: 'moozistud',
  port: 3306, //pour docker changer juste le port sur 3307 ou autre 
  password: '%4%(?Dk8&6!Qx6H[',
  database: 'transvie_prestations'
}); */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) throw err;
  console.log('🟢 Connecté à MySQL');
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Accès refusé' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
}

// ▶️ Inscription
app.post('/api/register', async (req, res) => {
  // Déstructuration des données du corps de la requête
  const { email, password, firstname, lastname } = req.body;

  // Validation basique pour vérifier que les champs obligatoires sont présents
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Vérifier si l'email existe déjà dans la base de données
  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL pour insérer l'utilisateur dans la base de données
    const insertSql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';

    db.query(insertSql, [firstname, lastname, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Réponse si l'insertion est réussie
      res.status(201).json({ message: '✅ Utilisateur enregistré avec succès' });
    });
  });
});


// ▶️ Connexion
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Identifiants invalides' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token,  user: {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
    },});
  });
});

  app.post('/api/prestations', authenticateToken, (req, res) => {
    const { agenceId, actId, date, otherAct, cout, certificateNumber } = req.body;
    console.log('auth user : ', req.user)
    const userId = req.user?.userId; // ou req.session.userId ou autre
  
    if (!userId) return res.status(401).json({ error: 'Utilisateur non authentifié' });
  
    const sql = `
      INSERT INTO prestations 
      (agence_id, act_id, date, other_act, cout, certificate_number, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [agenceId, actId, date, otherAct, cout, certificateNumber, userId], (err, result) => {
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

  // Récupérer toutes les catégories
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Récupérer les sous-catégories selon la catégorie
app.get('/api/subcategories', (req, res) => {
  const sql = `
    SELECT 
      cat.id AS category_id,
      cat.name AS category_name,
      sub.id AS subcategory_id,
      sub.name AS subcategory_name
    FROM categories cat
    LEFT JOIN subcategories sub ON cat.id = sub.category_id
    ORDER BY cat.id, sub.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Transformer les résultats en nested objects
    const nested = [];
    const map = new Map();

    results.forEach(row => {
      if (!map.has(row.category_id)) {
        const categoryObj = {
          category_id: row.category_id,
          category_name: row.category_name,
          subcategories: []
        };
        map.set(row.category_id, categoryObj);
        nested.push(categoryObj);
      }

      if (row.subcategory_id) {
        map.get(row.category_id).subcategories.push({
          id: row.subcategory_id,
          name: row.subcategory_name
        });
      }
    });

    res.json(nested);
  });
});

  app.get('/api/prestations', (req, res) => {
    const sql = `
      SELECT 
        p.id,
        a.name AS agence,
        sc.name AS prestation,
        p.date,
        p.cout
      FROM prestations p
      JOIN agences a ON p.agence_id = a.id
      LEFT JOIN subcategories sc ON p.act_id = sc.id
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
        p.*, 
        a.name AS agence, 
        sc.name AS prestation, 
        DATE(p.date) AS date
      FROM prestations p
      JOIN agences a ON p.agence_id = a.id
      LEFT JOIN subcategories sc ON p.act_id = sc.id
      ORDER BY DATE(p.date) DESC
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des prestations :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
    });
  });
  

app.listen(3001, () => console.log('🚀 Backend en ligne sur http://localhost:3001'));
