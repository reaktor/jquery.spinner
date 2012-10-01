require.config({
  paths:{
    'jQuery':'../lib/jquery-1.8.0.min',
    'chai':'./chai-1.2.0',
    'chai.jquery':'./chai-jquery-1.0.0',
    'mocha':'./mocha-1.4.2',
    'jquery.spinner':'../src/jquery.spinner'
  },
  shim:{
    'mocha':{ exports:'mocha' },
    'chai.jquery':['jQuery', 'chai'],
    'jquery.spinner':['jQuery']
  },
  urlArgs: "bust=" +  (new Date()).getTime()
})

define([
  'mocha',
  'chai',
  'chai.jquery'
], function (mocha, chai, chaiJquery) {
  chai.use(chaiJquery)
  mocha.setup({ ui:'bdd', ignoreLeaks:true })
  window.should = chai.should()
  window.expect = chai.expect
  require(['jquery.spinner.spec'], function () {
    mocha.run()
  })
})