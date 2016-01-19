# aqicn

一个 aqicn.org 的非官方 API

## 安装

    npm install aqicn --save

## 使用

    var aqicn = require('aqicn');

    // 获取指定城市的全部AQI
    aqicn.getAQIs('beijing', function (err, res) {
      console.log(res);
    };

    // 获取指定城市的某一种AQI
    aqicn.getAQIByName('beijing', 'pm25', function (err, res) {
      console.log(res);
    };

    // 已知 AQI 等级时，查询对应的信息
    var level = 5;
    // AQI 级别名
    aqicn.info.level[level].name.cn;
    // 对健康的影响
    aqicn.info.level[level].implication.cn;
    // 建议采取的措施
    aqicn.info.level[level].statement.cn;

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
