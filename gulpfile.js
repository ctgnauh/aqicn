/**
 * @fileOverview
 * @name gulpfile.js
 * @author ctgnauh <huangtc@outlook.com>
 * @license MIT
 */

var gulp = require('gulp');
var gulpMocha = require('gulp-mocha');

gulp.task('test', function () {
  'use strict';
  return gulp.src('test/test.js').pipe(gulpMocha());
});

gulp.task('watch', function () {
  'use strict';
  gulp.watch(['src/*.js', 'src/info.json', 'test/*.js'], ['test']);
});

gulp.task('default', ['test']);
