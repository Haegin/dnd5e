'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var jasmine = require('gulp-jasmine');
var browserify = require('gulp-browserify');
var reactify = require('gulp-reactify');
var sourcemaps = require('gulp-sourcemaps');

var getBundleName = function() {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.min';
};

gulp.task('javascript', function() {
  gulp.src('./js/main.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
      transform: [
        ['coffee-reactify'],
        ['reactify', {'es6': true}],
        ['es6ify']
      ],
      extension: ['.coffee', '.cjsx', '.jsx'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload())
});

gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test:prepare', function() {
  gulp.src('./spec/**/*.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
      transform: [
        ['coffee-reactify'],
        ['reactify', {'es6': true}],
        ['es6ify']
      ],
      extension: ['.coffee', '.cjsx', '.jsx'],
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./spec'));
});

gulp.task('test', function() {
  gulp.src('spec/**/*.js')
    .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['jshint', 'javascript']);
  gulp.watch('./*.html', ['html']);
  gulp.watch(['./js/**/*.js', './test/specs/**/*_test.js'], ['test']);
});

gulp.task('default', ['connect', 'javascript', 'watch']);
