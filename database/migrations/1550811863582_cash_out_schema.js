'use strict'

const Schema = use('Schema')

class CashOutSchema extends Schema {
  up () {
    this.create('cash_outs', (table) => {
      table.increments()
      table.float('total_amount').notNullable()
      table.integer('service_delivery').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('cash_outs')
  }
}

module.exports = CashOutSchema
