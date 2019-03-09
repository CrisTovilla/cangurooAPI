'use strict'

const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.integer('client').notNullable().unsigned().references('id').inTable('users')
      table.integer('number')
      table.integer('cuv')
      table.time('expiration_date')
      table.timestamps()

    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
