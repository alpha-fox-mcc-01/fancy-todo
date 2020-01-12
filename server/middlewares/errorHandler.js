module.exports = (err, req, res, next) => {
   if (err.length == 0) {
      res.status(404).json({ msg: `no data` })
   }
   else if (err.n == 0) {
      res.status(404).json({ msg: `data not found` })
   }
   else {
      res.status(500).json({ msg: err.message })
   }
}