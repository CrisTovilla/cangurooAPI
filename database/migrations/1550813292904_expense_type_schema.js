'use strict'

const Schema = use('Schema')

class ExpenseTypeSchema extends Schema {
  up () {
    this.create('expense_types', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }
  
  down () {
    this.drop('expense_types')
  }
}

module.exports = ExpenseTypeSchema
