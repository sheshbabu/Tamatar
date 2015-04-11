var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint');

// Lint
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Default
gulp.task('default', ['lint']);