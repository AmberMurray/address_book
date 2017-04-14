'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('contacts', table => {
    table.increments()
    table.integer('address_id').notNullable()
    table.string('first').notNullable().defaultTo('')
    table.string('last').notNullable().defaultTo('')
    table.string('phone').notNullable().defaultTo(0)
    table.string('email').notNullable().defaultTo('')
    table.text('image')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('contacts')
}
