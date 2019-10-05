"use strict";

const gulp = require('gulp');
const jslint = require('gulp-jslint');

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'app.js', 'src/**/*.js'])
    .pipe(jslint({
      node: true,
      es6: true,
      white: true
    }))
    .pipe(jslint.reporter('lint', true));
});

gulp.task('build', function() {
  return gulp.src(['app.js'])
})