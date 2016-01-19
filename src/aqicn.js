/**
 * @fileOverview
 * @name aqicn.js
 * @author ctgnauh <huangtc@outlook.com>
 * @license MIT
 */

var request = require('request');
var cheerio = require('cheerio');
var info = require('./info.json');

/**
 * 从 aqicn.org 上获取空气信息
 * @module aqicn
 */
module.exports = {

  // 一些多余的信息
  info: info,

  /**
   * fetchWebPage 的 callback
   * @callback module:aqicn~fetchWebPageCallback
   * @param {object} error - 请求错误
   * @param {object} result - 页面文本
   */
  /**
   * 抓取移动版 aqicn.org 页面。
   * aqicn.org 桌面版在300kb以上，而移动版则不足70kb。所以使用移动版，链接后面加 /m/ 。
   * @param {string} city - 城市或地区代码，详见[全部地区](http://aqicn.org/city/all/)
   * @param {module:aqicn~fetchWebPageCallback} callback
   */
  fetchWebPage: function (city, callback) {
    'use strict';
    request.get('http://aqicn.org/city/' + city + '/m/', function (err, res, body) {
      if (err) {
        callback(err, '');
      } else {
        callback(null, body);
      }
    });
  },

  /**
   * 分析 html 文件并返回指定的 AQI 值
   * @param {string} body - 页面文本
   * @param {string} name - 污染物代码：pm25、pm10、o3、no2、so2、co
   * @returns {number} AQI 值
   */
  selectAQIText: function (body, name) {
    'use strict';
    if (!body) {
      return -1;
    }
    var $ = cheerio.load(body);
    var json = JSON.parse($('#table script').text().slice(12, -2));   // "genAqiTable({...})"
    var aqis = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];
    var value = aqis.indexOf(name);
    return json.d[value].iaqi;
  },

  /**
   * 污染等级及相关信息
   * @param {number} level - AQI 级别
   * @param {string} lang - 语言：cn、en、jp、es、kr、ru、hk、fr、pl（但当前只有 cn 和 en）
   * @returns {object} 由AQI级别、污染等级、对健康影响情况、建议采取的措施组成的对象
   */
  selectInfoText: function (level, lang) {
    'use strict';
    var self = this;
    if (level < 0) {
      level = 0;
    }
    return {
      value: level,
      name: self.info.level[level].name[lang],
      implication: self.info.level[level].implication[lang],
      statement: self.info.level[level].statement[lang]
    };
  },

  /**
   * 计算 AQI，这里选取 aqicn.org 采用的算法，选取 AQI 中数值最大的一个
   * @param {array} aqis - 包含全部 AQI 数值的数组
   * @returns {number} 最大 AQI
   */
  calculateAQI: function (aqis) {
    'use strict';
    return Math.max.apply(null, aqis);
  },

  /**
   * 计算空气污染等级，分级标准详见[关于空气质量与空气污染指数](http://aqicn.org/?city=&size=xlarge&aboutaqi)
   * @param {number} aqi - 最大 AQI
   * @returns {number} AQI 级别
   */
  calculateLevel: function (aqi) {
    'use strict';
    var level = 0;
    if (aqi >= 0 && aqi <= 50) {
      level = 1;
    } else if (aqi >= 51 && aqi <= 100) {
      level = 2;
    } else if (aqi >= 101 && aqi <= 150) {
      level = 3;
    } else if (aqi >= 151 && aqi <= 200) {
      level = 4;
    } else if (aqi >= 201 && aqi <= 300) {
      level = 5;
    } else if (aqi > 300) {
      level = 6;
    }
    return level;
  },

  /**
   * getAQIs 的 callback
   * @callback module:aqicn~getAQIsCallback
   * @param {object} error - 请求错误
   * @param {object} result - 包含全部污染物信息的对象
   */
  /**
   * 获取指定城市的全部 AQI 数值
   * @param {string} city - 城市或地区代码，详见[全部地区](http://aqicn.org/city/all/)
   * @param {string} lang - 语言：cn、en、jp、es、kr、ru、hk、fr、pl（但当前只有 cn 和 en）
   * @param {module:aqicn~getAQIsCallback} callback
   */
  getAQIs: function (city, lang, callback) {
    'use strict';
    var self = this;
    this.fetchWebPage(city, function (err, body) {
      if (err) {
        callback(err);
      }
      var pm25 = self.selectAQIText(body, 'pm25'),
          pm10 = self.selectAQIText(body, 'pm10'),
          o3 = self.selectAQIText(body, 'o3'),
          no2 = self.selectAQIText(body, 'no2'),
          so2 = self.selectAQIText(body, 'so2'),
          co = self.selectAQIText(body, 'co'),
          aqi = self.calculateAQI([pm25, pm10, o3, no2, so2, co]),
          level = self.calculateLevel(aqi),
          levelInfo = self.selectInfoText(level, lang);
      callback(null, {
        aqi: aqi,
        city: city,
        pm25: pm25,
        pm10: pm10,
        o3: o3,
        no2: no2,
        so2: so2,
        co: co,
        level: levelInfo
      });
    });
  },

  /**
   * getAQIByName 的 callback
   * @callback module:aqicn~getAQIByNameCallback
   * @param {object} error - 请求错误
   * @param {object} result - 城市或地区代码与指定的 AQI
   */
  /**
   * 获取指定城市的指定污染物数值
   * @param {string} city - 城市或地区代码
   * @param {string} name - 污染物代码：pm25、pm10、o3、no2、so2、co
   * @param {module:aqicn~getAQIByNameCallback} callback
   */
  getAQIByName: function (city, name, callback) {
    'use strict';
    this.getAQIs(city, 'cn', function (err, res) {
      if (err) {
        callback(err);
      }
      callback(null, {
        city: city,
        value: res[name]
      });
    });
  }

};
