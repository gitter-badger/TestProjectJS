const LogRocket = require('logrocket')
const SuperSecret = require('../secret')

let Rollbar = require('rollbar')

let rollbar = null
let logrocket = null;

class Logger {
  static enableLogRocket() {
    if (logrocket) {
      return
    }

    LogRocket.init('eratqs/testprojectjs')
    LogRocket.identify('TEST_USER_ID', {
      name: 'Justin Gross',
      email: 'jgross.biz@gmail.com',
      // Add your own custom user variables here, ie:
      demoApp: 'true'
    })
  }

  static enableRollbar() {
    if (rollbar) {
      return
    }

    Rollbar.configure({
      payload : {
        person: {
          id: 1,
          username: 'Justin Gross',
          email: 'jgross.biz@gmail.com',
          sessionUrl: LogRocket.sessionURL
        }
      }
    })

    rollbar = new Rollbar(SuperSecret.RollbarToken())
  }

  static info(message) {
    console.info(message)
    if (rollbar) {
      rollbar.info(message)
    }
  }

  static debug(message) {
    console.debug(message)
    if (rollbar) {
      rollbar.debug(message)
    }
  }

  static warn(message) {
    console.warn(message)
    if (rollbar) {
      rollbar.warn(message)
    }
  }

  static error(message) {
    console.error(message)
    if (rollbar) {
      rollbar.error(message)
    }
  }
}

module.exports = Logger
