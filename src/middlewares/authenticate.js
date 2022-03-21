const authenticateMiddleware = (req, res, next) => {
  const userId = req.header('user_id');

  if (userId !== '1') {
    res.sendStatus(401);
  }

  if (userId === '1') {
    next();
  }
};

export default authenticateMiddleware;
