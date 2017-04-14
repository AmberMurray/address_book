var express = require('express')
var router = express.Router()

//REDIRECT FROM THE HOME PAGE TO THE CONTACTS PAGE
router.get('/', (req, res, next) => {
  res.redirect('/contacts')
})
module.exports = router
