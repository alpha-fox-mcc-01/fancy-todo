module.exports = (err, req, res, next) => {
  const status = 500;
  res.status(status).json(err);
}