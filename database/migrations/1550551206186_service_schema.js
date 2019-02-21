'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('service_type_id').unsigned().index('service_type_id')
      table.integer('client_id').unsigned().index('client_id')
      table.integer('service_delivery_id').unsigned().index('service_delivery_id')
      table.integer('location_a_id').unsigned().index('location_a_id')
      table.string('description_a')
      table.integer('location_b_id').unsigned().index('location_b_id')
      table.string('description_b')
      table.string('reference')
      table.time('date_time_required')
      table.foreign('service_type_id').references('service_types.id')
      table.foreign('client_id').references('clients.id')
      table.foreign('service_delivery_id').references('service_deliveries.id')
      table.foreign('location_a_id').references('locations.id')
      table.foreign('location_b_id').references('locations.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
