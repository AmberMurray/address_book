'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('addresses', table => {
    table.increments()
    table.string('line_1').notNullable().defaultTo('')
    table.string('line_2').notNullable().defaultTo('')
    table.string('city').notNullable().defaultTo('')
    table.string('state').notNullable().defaultTo('')
    table.string('zip').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('addresses')
}
