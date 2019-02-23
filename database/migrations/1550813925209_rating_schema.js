'use strict'

const Schema = use('Schema')

class RatingSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('stars',1)
      table.string('comment')
      table.integer('service_delivery_id').unsigned().index('service_delivery_id')
      table.integer('client_id').unsigned().notNullable().index('client_id')
      table.foreign('client_id').references('clients.id')
      table.foreign('service_delivery_id').references('service_deliveries.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
