'use strict'

const Schema = use('Schema')

class LocationsSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.decimal('latitude',20,10).notNullable()
      table.decimal('longitude',20,10).notNullable()
      table.string('address').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationsSchema
