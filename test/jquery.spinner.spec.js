require.config({
  paths:{ 'mocha':'./mocha-1.4.2', 'jquery.spinner':'../src/jquery.spinner' },
  shim:{ 'mocha':{ exports:'mocha' }, 'jquery.spinner':['../lib/jquery-1.8.0.min'] },
  urlArgs:"bust=" + (new Date()).getTime()
})

define([ 'mocha', './chai-1.2.0', './chai-jquery-1.0.0', 'jquery.spinner' ], function (mocha, chai, chaiJquery, spinner) {
  chai.use(chaiJquery)
  mocha.setup({ ui:'bdd'})
  window.expect = chai.expect

  describe('jquery.spinner', function () {
    var input

    describe('when rendering', function () {
      beforeEach(createDefaultSpinner)

      it('has default value of zero', function () {
        expect(input).to.have.value('0')
      })

      it('has disabled decrease button', function () {
        expect(input.prev('.decrease')).to.have.attr('disabled', 'disabled')
      })

      it('has passive state if value is zero', function () {
        expect(input).to.have.class('passive')
        setValue('1')
        expect(input).not.have.class('passive')
      })
    })

    describe('when clicking buttons', function () {
      beforeEach(createDefaultSpinner)

      it('increases with increase button', function () {
        clickIncrease()
        clickIncrease()
        expect(input).to.have.value('2')
      })

      it('decreases with decrease button', function () {
        clickIncrease()
        clickIncrease()
        clickDecrease()
        expect(input).to.have.value('1')
      })
    })

    describe('when entering a value', function () {
      beforeEach(createDefaultSpinner)

      it('has "invalid" class when not a number', function () {
        expect(input).not.to.have.class('invalid')
        setValue('asdf')
        expect(input).to.have.class('invalid')
        setValue('4')
        expect(input).not.to.have.class('invalid')
      })

      it('displays "invalid" class when negative', function () {
        setValue('-1')
        expect(input).to.have.class('invalid')
      })
    })

    describe('with custom options', function () {
      beforeEach(function () {
        input = $('<input type="text"/>')
        input.spinner({value:2, min:1})
      })

      it('has modifiable default value', function () {
        expect(input).to.have.value('2')
      })

      it('has modifiable minimum value', function () {
        clickDecrease()
        clickDecrease()
        expect(input).to.have.value('1')
      })
    })

    function clickIncrease() {
      if (!input.next('.increase').attr('disabled')) {
        input.next('.increase').click()
      }
    }

    function clickDecrease() {
      if (!input.prev('.decrease').attr('disabled')) {
        input.prev('.decrease').click()
      }
    }

    function setValue(value) { input.val(value).keyup() }

    function createDefaultSpinner() { input = $('<input type="text" />').spinner() }
  })

  mocha.run()
})
