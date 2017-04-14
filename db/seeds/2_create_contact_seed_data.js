
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contacts').del()
  .then(function () {
    // Inserts seed entries
    return knex('contacts').insert([
      {
        address_id: 1,
        first: 'Mary',
        last:  'Crawley',
        phone: '111-555-1212',
        email: 'mcrawley@email.com',
        image: 'http://www.radiotimes.com/uploads/images/Original/86703.jpg'
      },
      {
        address_id: 2,
        first: 'Violet',
        last:  'Crawley',
        phone: '333-542-1217',
        email: 'vcrwaley@email.com',
        image: 'http://images6.fanpop.com/image/polls/1263000/1263632_1376371953914_full.jpg'
      },
      {
        address_id: 1,
        first: 'Cora',
        last:  'Crawley',
        phone: '888-555-1617',
        email: 'ccrawley@email.com',
        image: 'http://static.tvtropes.org/pmwiki/pub/images/cora_768.png'
      },
      {
        address_id: 3,
        first: 'Isobel',
        last:  'Crawley',
        phone: '777-890-1216',
        email: 'icrawley@email.com',
        image: 'https://s-media-cache-ak0.pinimg.com/originals/12/65/f4/1265f4d99de2ecf93e80bc88a3885051.jpg'
      },
      {
        address_id: 1,
        first: 'Charles',
        last:  'Carson',
        phone: '123-345-1212',
        email: 'mcarson@email.com',
        image: 'http://2.bp.blogspot.com/__7s9GUTM-oY/TI6rTEaxuKI/AAAAAAAASP0/HWwmOxvCca8/s1600/da+12.PNG'
      }
    ])
  }).then (() => {
    return knex.raw(
      "SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts))"
    )
  })
}
