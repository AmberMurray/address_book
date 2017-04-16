var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

//HOME PAGE - SHOW ALL CONTACTS
router.get('/', (req, res, next) => {
  knex.from('contacts')
  .innerJoin('addresses', 'contacts.address_id', 'addresses.id')
  .select('*', 'contacts.id as contact_id','addresses.id as addressID')
  .then( contacts => {
    console.log(contacts);
    res.render('contacts/index', {contacts})
  })
})

//SHOW THE ADD NEW CONTACT PAGE
router.get('/new', (req, res, next) => {
  res.render('contacts/new')
})

// //SHOW CONTACT TO EDIT
// router.get('/:id', (req, res, next) => {
//   let id = req.params.id
//   console.log(id);
//   knex('contacts')
//   .innerJoin('addresses', 'contacts.address_id', 'addresses.id')
//   .where({ id })
//   .first()
//   .then(contact => {
//     console.log(contact);
//     res.render('contacts/new', contact)
//   })
// })

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



//UPDATE AN EXISTING CONTACT
// router.put('/:id', (req, res, next) => {
//   let id = req.params.id
//   knex('contacts')
//   .where({id})
//
//
// })

// DELETE A CONTACT (AND MAYBE THE ASSOCIATED ADDRESS)
router.delete('/:id',(req,res,next) => {
  let id = req.params.id

  console.log('*****************',id)

  knex('contacts')
  // .select('address_id')
  .where({ id })
  .returning('*')
  .then(result => {

    console.log('****************', result)

    knex('contacts')
    .count()
    .where('address_id', result[0])
    .then(count => {

      console.log('*****************',count)

      if (count[0] === 1) {
        knex('addresses')
        .del()
        .where('id', addressID)
        .then(() => {
          res.redirect('/contacts')
        })
      } //ELSE DELETE CONTACT BUT NOT ADDRESS
      res.redirect('/contacts')
    })
  })
})

module.exports = router
