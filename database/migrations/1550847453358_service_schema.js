'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('service_type_id').unsigned().notNullable().index('service_type_id')
      table.integer('client_id').unsigned().notNullable().index('client_id')
      table.integer('service_delivery_id').unsigned().index('service_delivery_id')
      table.integer('location_a_id').notNullable().unsigned().index('location_a_id')
      table.string('description_a').notNullable()
      table.integer('location_b_id').notNullable().unsigned().index('location_b_id')
      table.string('description_b').notNullable()
      table.string('reference').notNullable()
      table.float('price_service').notNullable()
      table.float('price_deliver').notNullable()
      table.datetime('date_time_required').notNullable()
      table.integer('service_status_type_id').notNullable().unsigned().index('service_status_type_id')
      table.foreign('service_type_id').references('service_types.id')
      table.foreign('client_id').references('clients.id')
      table.foreign('service_delivery_id').references('service_deliveries.id')
      table.foreign('location_a_id').references('locations.id')
      table.foreign('location_b_id').references('locations.id')
      table.foreign('service_status_type_id').references('service_status_types.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
