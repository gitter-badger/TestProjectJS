const LogRocket = require('logrocket')
const rewire = require('rewire')
const logger = rewire('./logger')

describe('Logger', () => {
  before(() => {
    sinon.stub(LogRocket, 'init')
    sinon.stub(LogRocket, 'identify')
  })

  after(() => {
    LogRocket.init.restore()
    LogRocket.identify.restore()
  })

  beforeEach(() => {
    logger.__set__('rollbar', null)
    logger.__set__('logrocket', null)
  })

  describe('#enableLogRocket', () => {
    it('should initialize and configure LogRocket', () => {
      logger.enableLogRocket()

      LogRocket.init.should.have.been.called
      LogRocket.identify.should.have.been.called
    })
  })

  describe('#enableRollbar', () => {
    it('should initialize and configure Rollbar', () => {
      let rollbarConfigure = sinon.stub()
      let RollbarFake = sinon.stub().callsFake(() => {
        return {
          configure: rollbarConfigure
        }
      })

      logger.__set__('Rollbar', RollbarFake)

      logger.enableRollbar()

      RollbarFake.should.have.been.called
      rollbarConfigure.should.have.been.called
    })
  })

  describe('#info', () => {
    it('should log info to console', () => {
      let logMessage = 'Something to log!'
      sinon.stub(console, 'info')

      logger.info(logMessage)

      let consoleCalledWithMessage = console.info.withArgs(logMessage).called
      console.info.restore()

      consoleCalledWithMessage.should.be.true
    })

    it('should log info to Rollbar if enabled', () => {
      let logMessage = 'Something to log!'
      let rollbarStub = {
        info: sinon.stub()
      }

      sinon.stub(console, 'info')
      logger.__set__('rollbar', rollbarStub)

      logger.info(logMessage)

      let rollbarCalledWithMessage =
        rollbarStub.info.withArgs(logMessage).called

      rollbarCalledWithMessage.should.be.true
    })
  })

  describe('#debug', () => {
    it('should log debug to console', () => {
      let logMessage = 'Something to log!'
      sinon.stub(console, 'debug')

      logger.debug(logMessage)

      let consoleCalledWithMessage = console.debug.withArgs(logMessage).called
      console.debug.restore()

      consoleCalledWithMessage.should.be.true
    })

    it('should log debug to Rollbar if enabled', () => {
      let logMessage = 'Something to log!'
      let rollbarStub = {
        debug: sinon.stub()
      }

      sinon.stub(console, 'debug')
      logger.__set__('rollbar', rollbarStub)

      logger.debug(logMessage)

      let rollbarCalledWithMessage =
        rollbarStub.debug.withArgs(logMessage).called
      console.debug.restore()

      rollbarCalledWithMessage.should.be.true
    })
  })

  describe('#warn', () => {
    it('should log warning to console', () => {
      let logMessage = 'Something to log!'
      sinon.stub(console, 'warn')

      logger.warn(logMessage)

      let consoleCalledWithMessage = console.warn.withArgs(logMessage).called
      console.warn.restore()

      consoleCalledWithMessage.should.be.true
    })

    it('should log warning to Rollbar if enabled', () => {
      let logMessage = 'Something to log!'
      let rollbarStub = {
        warn: sinon.stub()
      }

      sinon.stub(console, 'warn')
      logger.__set__('rollbar', rollbarStub)

      logger.warn(logMessage)

      let rollbarCalledWithMessage =
        rollbarStub.warn.withArgs(logMessage).called
      console.warn.restore()

      rollbarCalledWithMessage.should.be.true
    })
  })

  describe('#error', () => {
    it('should log error to console', () => {
      let logMessage = 'Something to log!'
      sinon.stub(console, 'error')

      logger.error(logMessage)

      let consoleCalledWithMessage = console.error.withArgs(logMessage).called
      console.error.restore()

      consoleCalledWithMessage.should.be.true
    })

    it('should log error to Rollbar if enabled', () => {
      let logMessage = 'Something to log!'
      let rollbarStub = {
        error: sinon.stub()
      }

      sinon.stub(console, 'error')
      logger.__set__('rollbar', rollbarStub)

      logger.error(logMessage)

      let rollbarCalledWithMessage =
        rollbarStub.error.withArgs(logMessage).called
      console.error.restore()

      rollbarCalledWithMessage.should.be.true
    })
  })
})
