/**
 * @fileOverview
 * @name test.js
 * @author ctgnauh <huangtc@outlook.com>
 * @license MIT
 */

"use strict";

var aqicn = require('../index.js');
var assert = require('chai').assert;

var options = {
  city: 'beijing',
  aqi: 'pm25',
  lang: 'cn'
};

describe('fetchWebPage', function () {
  this.timeout(1000);
  it('should fetch web page from http://aqicn.org/beijing/m/', function () {
    aqicn.fetchWebPage(options.city, function (err, res) {
      assert.typeOf(aqicn.selectAQIText(res, options.aqi), 'number');
    });
  });
});

describe('getAQIs', function () {
  this.timeout(4000);
  it('should get all aqis', function (done) {
    aqicn.getAQIs(options.city, options.lang, function (err, res) {
      assert.equal(err, null);
      done();
    });
  });
});

describe('getAQIByName', function () {
  this.timeout(4000);
  it('should get pm2.5', function (done) {
    aqicn.getAQIByName(options.city, options.aqi, function (err, res) {
      assert.equal(err, null);
      done();
    });
  });
});
