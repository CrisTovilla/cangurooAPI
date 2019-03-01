'use strict'

const Schema = use('Schema')

class RatingSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('stars',1)
      table.string('comment')
      table.integer('service_delivery_id').unsigned().references('id').inTable('service_deliveries')
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
