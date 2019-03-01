'use strict'

const Schema = use('Schema')

class ServiceDeliverySchema extends Schema {
  up () {
    this.create('service_deliveries', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unique().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_deliveries')
  }
}

module.exports = ServiceDeliverySchema
