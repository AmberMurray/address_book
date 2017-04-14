var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

//home page - show all contacts
router.get('/', (req, res, next) => {
  knex('contacts')
  .select('*')
  .innerJoin('addresses', 'contacts.address_id', 'addresses.id')
  .orderBy('last')
  .then(contacts => {
    res.render('contacts/index', {contacts})
  })
})



module.exports = router
