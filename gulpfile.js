let gulp = require('gulp')
let jsdoc = require('gulp-jsdoc3')

gulp.task('docs', function (cb) {
    let config = require('./jsdoc.json');
    gulp.src(['README.md', './app/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
})