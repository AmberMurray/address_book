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

//show the add a new contact page
router.get('/new', (req, res, next) => {
  res.render('contacts/new')
})

//add a new contact & address
router.post('/new', (req, res, next) => {
  let newAddress = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
  knex('addresses')
  .insert(newAddress, '*')
  .then(address => {
    console.log('AWWWWWW YEAH!', address)
    res.render('contacts/index', { address })
  })
})

module.exports = router
