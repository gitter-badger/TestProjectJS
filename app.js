const log = require('./lib/logger')

/**
 * App component
 */
class App {
  /**
   * Start the app component
   */
  static start() {
    log.enableLogRocket()
    log.enableRollbar()
    log.info('Starting app...')
  }
}

if (process.env.NODE_ENV !== 'test') {
  App.start()
}

module.exports = App
