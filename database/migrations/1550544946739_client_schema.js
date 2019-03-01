'use strict'

const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unique().unsigned().references('id').inTable('users')
      table.integer('card_id').unsigned().unique().unsigned().references('id').inTable('cards')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
