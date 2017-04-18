var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

//HOME PAGE - SHOW ALL CONTACTS
router.get('/', function(req, res, next) {
  knex('contacts')
    .select('contacts.id', 'address_id', 'first', 'last', 'phone', 'email','image', 'line_1', 'line_2', 'city', 'state', 'zip')
    .innerJoin('addresses', 'contacts.address_id', 'addresses.id')
    .orderBy('last')
  .then(contacts => {
     res.render('contacts/index', { contacts })
  })
  .catch(err => {
    next(err)
  })
})

//SHOW THE ADD NEW CONTACT PAGE
router.get('/new', (req, res, next) => {
  res.render('contacts/new')
})

//ADD A NEW ADDRESS & THEN A NEW CONTACT
router.post('/', (req, res, next) => {
  let newAddress = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
  knex('addresses')
  .insert(newAddress, '*')
  .then(newDatabaseAddress => {
    let newContact = {
      address_id: newDatabaseAddress[0].id,
      first: req.body.first,
      last: req.body.last,
      phone: req.body.phone,
      email: req.body.email,
      image: req.body.image
    }
    return knex('contacts')
    .insert(newContact)
    .returning('id')
  }).then(id => {
    res.redirect('/contacts')
  })
})

// ADD THE CONTACT INFO TO EDIT TO THE FORM
router.get('/edit/:id', function(req, res, next) {
  knex.from('contacts')
  .innerJoin('addresses', 'contacts.address_id', 'addresses.id')
  .select('*', 'contacts.id as contact_id','addresses.id as addressID')
  .where('contacts.id', req.params.id)
  .first()
  .then( contact => {
    res.render('contacts/new', {contact})
  })
})

//UPDATE AN EXISTING CONTACT
router.put('/:id', (req,res,next) => {
  let address = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
  let contact = {
    first: req.body.first,
    last: req.body.last,
    phone: req.body.phone,
    email: req.body.email,
    image: req.body.image
  }
  var contact_id = req.params.id;
  knex('contacts')
  .update(contact)
  .where('id', contact_id)
  .returning('address_id')
  .then(id  => {
    knex('addresses')
    .update(address)
    .where('id', id[0])
    .then(() => {
      res.redirect('/contacts')
    })
  })
});

// DELETE A CONTACT (AND MAYBE THE ASSOCIATED ADDRESS
router.delete('/:id',(req,res,next) => {
    let id = req.params.id
    knex('contacts')
    .where('id', id)
    .select('*')
    .first()
    .then(result => {
      addressId = result.address_id
      knex('contacts')
      .del()
      .where('id', id)
      .then( () => {
        knex('contacts')
        .where('address_id', addressId)
        .count()
        .first()
        .then((result) => {
          var count = result.count
          if (count == 0) {
            knex('addresses')
            .del()
            .where('id', addressId)
            .then( () => {
            })
          }
        })
      })
    })
    res.redirect('/contacts')
  })

module.exports = router
