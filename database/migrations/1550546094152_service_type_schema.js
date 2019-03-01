'use strict'

const Schema = use('Schema')

class ServiceTypeSchema extends Schema {
  up () {
    this.create('service_types', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_types')
  }
}

module.exports = ServiceTypeSchema
