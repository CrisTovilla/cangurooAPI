'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('service_type_id').unsigned().references('id').inTable('service_types')
      table.integer('client_id').notNullable().unsigned().references('id').inTable('clients')
      table.integer('service_delivery_id').unsigned().references('id').inTable('service_deliveries')
      table.integer('location_a_id').notNullable().unsigned().references('id').inTable('locations')
      table.string('description_a').notNullable()
      table.integer('location_b_id').notNullable().unsigned().references('id').inTable('locations')
      table.string('description_b').notNullable()
      table.string('reference').notNullable()
      table.float('price_service').notNullable()
      table.float('price_deliver').notNullable()
      table.datetime('date_time_required').notNullable()
      table.integer('service_status_type_id').notNullable().unsigned().references('id').inTable('service_status_types')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
