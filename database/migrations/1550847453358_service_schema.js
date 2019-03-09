'use strict'

const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('service_type').unsigned().references('id').inTable('service_types')
      table.integer('client').notNullable().unsigned().references('id').inTable('users')
      table.integer('service_delivery').unsigned().references('id').inTable('users')
      table.integer('location_a').notNullable().unsigned().references('id').inTable('locations')
      table.string('description_a').notNullable()
      table.integer('location_b').notNullable().unsigned().references('id').inTable('locations')
      table.string('description_b').notNullable()
      table.string('reference').notNullable()
      table.float('price_service').notNullable()
      table.float('price_deliver').notNullable()
      table.datetime('date_time_required').notNullable()
      table.integer('service_status_type').notNullable().unsigned().references('id').inTable('service_status_types')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
