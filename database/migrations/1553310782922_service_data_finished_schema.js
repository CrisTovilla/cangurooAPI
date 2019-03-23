'use strict'

const Schema = use('Schema')

class ServiceDataFinishedSchema extends Schema {
  up () {
    this.create('service_data_finisheds', (table) => {
      table.increments()
      table.string('receiver_name')
      table.text('image_data')
      table.integer('service').unsigned().references('id').inTable('services')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_data_finisheds')
  }
}

module.exports = ServiceDataFinishedSchema
