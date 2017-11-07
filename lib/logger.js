const LogRocket = require('logrocket')
const SuperSecret = require('../secret')

let Rollbar = require('rollbar')

let rollbar = null
let logrocket = null;

/**
 * Logger component for logging
 */
class Logger {
  /**
   * Enable LogRocket support
   * @static
   */
  static enableLogRocket() {
    if (logrocket) {
      return
    }

    LogRocket.init('eratqs/testprojectjs')
    LogRocket.identify('TEST_USER_ID', {
      name: 'Justin Gross',
      email: 'jgross.biz@gmail.com',
      // Add your own custom user variables here, ie:
      demoApp: 'true',
    })
  }

  /**
   * Enable Rollbar support
   */
  static enableRollbar() {
    if (rollbar) {
      return
    }

    rollbar = new Rollbar(SuperSecret.rollbarToken())
    rollbar.configure({
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: process.env.NODE_ENV || 'unknown',
        person: {
          id: 1,
          username: 'Justin Gross',
          email: 'jgross.biz@gmail.com'
        },
      }
    })
  }

  /**
   * Log an informative message
   * @param {String} message to be logged
   */
  static info(message) {
    console.info(message)
    if (rollbar) {
      rollbar.info(message)
    }
  }

  /**
   * Log a debug message
   * @param {String} message to be logged
   */
  static debug(message) {
    console.debug(message)
    if (rollbar) {
      rollbar.debug(message)
    }
  }

  /**
   * Log a warning message
   * @param {String} message to be logged
   */
  static warn(message) {
    console.warn(message)
    if (rollbar) {
      rollbar.warn(message)
    }
  }

  /**
   * Log an error message
   * @param {String} message to be logged
   */
  static error(message) {
    console.error(message)
    if (rollbar) {
      rollbar.error(message)
    }
  }
}

module.exports = Logger
