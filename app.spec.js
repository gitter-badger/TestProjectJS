let App =  require('./app.js')

describe("#app", () => {
  it("should have default export which returns foo", () => {
    let foo = sinon.stub().callsFake(() => {
      return 'bar'
    })
    let bar = foo()
    expect(bar).to.equal('bar')
    foo.should.have.been.calledOnce
  })
})
