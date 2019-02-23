'use strict'

const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unique().unsigned().index('user_id')
      table.integer('card_id').unsigned().index('card_id')
      table.foreign('user_id').references('users.id')
      table.foreign('card_id').references('cards.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
