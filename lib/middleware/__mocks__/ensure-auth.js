module.exports = (req, res, next) => {
  req.user = {
    email: 'test2@test.com'
  };
  next();
};
