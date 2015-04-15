var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine-phantom');

// Lint
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('integrationTests', function() {
    return gulp.src('tests/specs/*.js')
        .pipe(jasmine({
            integration: true,
            vendor: ['tests/lib/jquery-2.1.3.min.js', 'tests/lib/jasmine-jquery.js', 'tests/specs/pomodoro-spec.js', 'src/scripts/timer.js', 'src/scripts/pomodoro.js']
        }));
});

// Default
gulp.task('default', ['lint', 'integrationTests']);