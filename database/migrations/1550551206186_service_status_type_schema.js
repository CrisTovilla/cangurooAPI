'use strict'

const Schema = use('Schema')

class ServiceStatusTypeSchema extends Schema {
  up () {
    this.create('service_status_types', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_status_types')
  }
}

module.exports = ServiceStatusTypeSchema
