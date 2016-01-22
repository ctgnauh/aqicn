/**
 * @fileOverview
 * @name test.js
 * @author ctgnauh <huangtc@outlook.com>
 * @license MIT
 */

var aqicn = require('../index.js');
var assert = require('chai').assert;

var options = {
  city: 'beijing',
  aqi: 'pm25',
  lang: 'cn',
  output: ""
};

describe('aqicn', function () {
  afterEach(function() {
    // console.log(options.output);
  });
  describe('#fetchWebPage()', function () {
    this.timeout(10000);
    it('should fetch web page from http://aqicn.org/beijing/m/', function () {
      aqicn.fetchWebPage(options.city, function (err, res) {
        assert.notEqual(res, '');
      });
    });
  });

  describe('#getAQIs()', function () {
    this.timeout(10000);
    it('should get all aqis', function (done) {
      aqicn.getAQIs(options.city, options.lang, function (err, res) {
        options.output = res;
        assert.equal(err, null);
        assert.isNumber(res.pm25);
        assert.isString(res.city);
        assert.isObject(res.level);
        assert.isString(res.time);
        done();
      });
    });
  });

  describe('#getAQIByName()', function () {
    this.timeout(10000);
    it('should get pm2.5', function (done) {
      aqicn.getAQIByName(options.city, options.aqi, function (err, res) {
        options.output = res;
        assert.equal(err, null);
        assert.isString(res.city);
        assert.isNumber(res.value);
        done();
      });
    });
  });

});
