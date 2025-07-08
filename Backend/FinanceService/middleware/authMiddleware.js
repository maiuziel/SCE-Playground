// Dummy middleware – does nothing but allows the route to work
function authMiddleware(req, res, next) {
  // No token validation – per instructor instructions
  next();
}

module.exports = authMiddleware;
