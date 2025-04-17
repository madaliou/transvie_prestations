const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Aucun token fourni' });
  }

  const token = authHeader.split(' ')[1]; // Format "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ton_secret');
    req.user = decoded; // contient par ex : { id: 12, email: "user@..." }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

module.exports = authenticate;
