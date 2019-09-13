module.exports = (req, res, next) => {
  req.user = {
    email: 'test@test.com'
  };
  next();
};
