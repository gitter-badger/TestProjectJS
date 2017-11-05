const rewire = require('rewire')
const log = require('./lib/logger')
const App = rewire('./app')

describe('App', () => {
  describe('#start', () => {
    beforeEach(() => {
      sinon.stub(log, 'enableRollbar')
      sinon.stub(log, 'enableLogRocket')
      sinon.stub(log, 'info')
    })

    afterEach(() => {
      log.enableRollbar.restore()
      log.enableLogRocket.restore()
      log.info.restore()
    })

    it('should enable Rollbar', () => {
      App.start()
      log.enableRollbar.should.have.been.calledOnce
    })

    it('should enable LogRocket', () => {
      App.start()
      log.enableLogRocket.should.have.been.calledOnce
    })

    it('should announce that it (the app) is starting', () => {
      App.start()
      log.info.withArgs('Starting app...').should.have.been.called
    })
  })
})
