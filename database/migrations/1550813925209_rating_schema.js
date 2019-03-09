'use strict'

const Schema = use('Schema')

class RatingSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('stars',1)
      table.string('comment')
      table.integer('service_delivery').unsigned().references('id').inTable('users')
      table.integer('client').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
