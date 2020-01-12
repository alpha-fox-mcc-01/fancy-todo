const bcryptjs = require('bcryptjs')

module.exports = password => {
  const salt = bcryptjs.genSaltSync(10)
  const hash = bcryptjs.hashSync(password, salt)
  return hash
}