exports.seed = function (knex) {
  return knex('contacts').del().then(() => {
    return knex('addresses').del()
  })
}
