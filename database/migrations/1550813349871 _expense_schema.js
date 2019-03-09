'use strict'

const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()
      table.integer('expense_type').notNullable().unsigned().references('id').inTable('expense_types')
      table.float('amount').notNullable()
      table.integer('service_delivery').notNullable().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
