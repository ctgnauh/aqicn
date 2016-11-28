# aqicn

[![Build Status](https://img.shields.io/travis/ctgnauh/aqicn/master.svg)](https://travis-ci.org/ctgnauh/aqicn)
[![David Dependencies](https://img.shields.io/david/ctgnauh/aqicn.svg)](https://david-dm.org/ctgnauh/aqicn)
[![David Dependencies](https://img.shields.io/david/dev/ctgnauh/aqicn.svg)](https://david-dm.org/ctgnauh/aqicn#info=devDependencies&view=table)
[![npm](https://img.shields.io/npm/v/aqicn.svg)](https://www.npmjs.com/package/aqicn)
[![npm](https://img.shields.io/npm/l/aqicn.svg)](https://www.npmjs.com/package/aqicn)

一个 [aqicn.org](http://aqicn.org) 的非官方 API。

## 安装

```
npm install aqicn --save
```

## 使用

加载模块：

```javascript
var aqicn = require('aqicn');
```

获取指定城市的全部 AQI 值：

```javascript
aqicn.getAQIs('beijing', 'cn', function (err, res) {
  console.log(res);
};
```

输出：

```javascript
{
  city: 'beijing',
  time: '2016-01-21T21:00:00+09:00',
  pm25: 212,
  pm10: 95,
  o3: 4,
  no2: 37,
  so2: 14,
  co: 28,
  aqi: 212,
  level: {
    value: 5,
    name: '重度污染',
    implication: '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状',
    statement: '儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动'
  }
}
```

获取指定城市的某一种 AQI 值：

```javascript
aqicn.getAQIByName('beijing', 'pm25', function (err, res) {
  console.log(res);
};
```

输出：

```javascript
{
  city: 'beijing',
  value: 212,
  time: '2016-01-21T21:00:00-09:00'
}
```

已知 AQI 等级查询对应的信息：

```javascript
var lv = 5;
var lang = 'cn';
aqicn.info.level[lv].name[lang];   // AQI 级别名
aqicn.info.level[lv].implication[lang];   // 对健康的影响
aqicn.info.level[lv].statement[lang];   // 建议采取的措施
```

## 问题

### 有没有历史查询功能？

无，但你可以自己抓取。

### 你怎么能用 HTTP 请求暴力抓取数据？这是不对的！

我方了。

### 你的代码为什么这样糟糕？

太好了！快快联系我，告诉我到底哪里糟糕！

## 感谢

[aqicn.org 网站](http://aqicn.org) - 提供数据

[Node.js](https://nodejs.org/)、[request](https://github.com/request/request)、[cheerio](https://github.com/cheeriojs/cheerio) - 提供技术

[GNU Emacs](https://www.gnu.org/software/emacs) - 提供开发环境

以及其他我所用到的工具、模块的作者们。
