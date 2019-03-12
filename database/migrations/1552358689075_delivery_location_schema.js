'use strict'

const Schema = use('Schema')

class DeliveryLocationSchema extends Schema {
  up () {
    this.create('delivery_locations', (table) => {
      table.increments()
      table.integer('delivery').notNullable().unsigned().references('id').inTable('users')
      table.decimal('latitude',20,10).nullable()
      table.decimal('longitude',20,10).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('delivery_locations')
  }
}

module.exports = DeliveryLocationSchema
