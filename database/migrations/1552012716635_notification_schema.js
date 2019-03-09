'use strict'

const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user').notNullable().unique().unsigned().references('id').inTable('users')
      table.string('title')
      table.string('content')
      table.boolean('isReaded').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
