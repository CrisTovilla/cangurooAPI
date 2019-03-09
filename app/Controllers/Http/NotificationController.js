'use strict'

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
  /**
   * Show a list of all notifications.
   * GET notifications
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new notification.
   * GET notifications/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new notification.
   * POST notifications
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single notification.
   * GET notifications/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing notification.
   * GET notifications/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update notification details.
   * PUT or PATCH notifications/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NotificationController
