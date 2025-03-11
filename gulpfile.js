/* eslint-disable */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser'); // gulp-terser를 가져옵니다.
const htmlmin = require('gulp-htmlmin');
const pipeline = require('readable-stream').pipeline;

gulp.task('minify-js', function (done) {
  return pipeline(
    gulp.src('./public/static/src/script.js'),
    terser(), // uglify 대신 terser를 사용합니다.
    gulp.dest('./public/static/js'),
    (err) => {
      if (err) {
        console.error('Pipeline failed with error:', err);
      } else {
        console.log('JS minification succeeded.');
      }
      done();
    }
  );
});


gulp.task('minify-html', function () {
  return gulp.src('./public/static/src/content.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public/static/html'));
});

gulp.task('default', gulp.parallel('minify-js'));

