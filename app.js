const log = require('./lib/logger')

class App {
  static start() {
    log.enableRollbar()
    log.enableLogRocket()
    log.info('Starting app...')
  }
}

if (process.env.NODE_ENV !== 'test')
  App.start()

module.exports = App
