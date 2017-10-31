let SuperSecret = require('./secret')
let LogRocket = require('logrocket')
LogRocket.init('eratqs/testprojectjs')
LogRocket.identify('TEST_USER_ID', {
  name: 'Justin Gross',
  email: 'jgross.biz@gmail.com',

  // Add your own custom user variables here, ie:
  demoApp: 'true'
});

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar(SuperSecret.RollbarToken());

Rollbar.configure({
  transform: function (obj) {
    obj.sessionURL = LogRocket.sessionURL;
    return obj;
  },
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world again!");

class App {
  static foo() {
    return 'bar'
  }
}

module.exports = App
