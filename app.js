let LogRocket = require('logrocket')
LogRocket.init('eratqs/testprojectjs')
LogRocket.identify('TEST_USER_ID', {
  name: 'Justin Gross',
  email: 'jgross.biz@gmail.com',

  // Add your own custom user variables here, ie:
  demoApp: 'true'
});

class App {
  static foo() {
    return 'bar'
  }
}

module.exports = App
