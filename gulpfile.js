"use strict";

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('test/test.js').pipe(mocha());
});

gulp.task('watch', function () {
  gulp.watch(['src/*.js', 'src/info.json', 'test/*.js'], ['test']);
});

gulp.task('default', ['test']);
