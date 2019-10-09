const { src } = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const app = require('./app');
const pkg = require('./package');

exports.lint = () => {
  'use strict';

  return src(['gulpfile.js', 'app.js', 'src/**/*.js', 'tests/**/*.js'])
    .pipe(jshint(pkg.jshintConfig))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
};

exports.build = (cb) => {
  'use strict';

  return app.init((error) => {
    cb(error);
    if (process.env.SEMAPHORE != undefined) process.exit();
  });
};
