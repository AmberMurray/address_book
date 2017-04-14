
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('addresses').del()
  .then(function () {
    // Inserts seed entries
    return knex('addresses').insert([
      {
        line_1: '123',
        line_2: 'Downton Abbey Ln',
        city: 'Springfield',
        state: 'IL',
        zip: '12345'
      },
      {
        line_1: '456',
        line_2: 'Proper Street',
        city: 'Chicago',
        state: 'IL',
        zip: '78910'
      },
      {
        line_1: '78910',
        line_2: 'Not In Kansas South',
        city: 'Gary',
        state: 'IN',
        zip: '66666'
      }
    ])
  }).then (() => {
    return knex.raw(
      "SELECT setval('addresses_id_seq', (SELECT MAX(id) FROM addresses))"
    )
  })
}
