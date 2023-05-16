const jwt = require('jsonwebtoken');

module.exports=function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}
