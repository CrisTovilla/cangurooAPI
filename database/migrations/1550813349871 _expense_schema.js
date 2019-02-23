'use strict'

const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()
      table.integer('expense_type_id').notNullable().unsigned().index('expense_type_id')
      table.float('amount').notNullable()
      table.integer('service_delivery_id').notNullable().unsigned().index('service_delivery_id')
      table.foreign('service_delivery_id').references('service_deliveries.id')
      table.foreign('expense_type_id').references('expense_types.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
