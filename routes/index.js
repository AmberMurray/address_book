var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

//home page - show all contacts
router.get('/', function(req, res, next) {
  knex.select('*').from('contacts').join('addresses', {'addresses_id': 'addresses.id'})
  // .orderBy('last')
  .then(contacts => {
    console.log('NOOOOOOOOO', contacts);
    res.render('/index', {contacts})
  })
})

module.exports = router
