'use strict'

const Schema = use('Schema')

class ServiceDeliverySchema extends Schema {
  up () {
    this.create('service_deliveries', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index('user_id')
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_deliveries')
  }
}

module.exports = ServiceDeliverySchema
