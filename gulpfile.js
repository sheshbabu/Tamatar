var gulp = require('gulp');

// Plugins
var jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    jasmine = require('gulp-jasmine-phantom');

// Lint
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compile-unit-test', function() {
    return gulp.src(['src/scripts/timer.js', 'tests/specs/timer.spec.js'])
        .pipe(concat('unit-test-specs.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('unit-test', ['compile-unit-test'], function() {
    return gulp.src('unit-test-specs.js')
        .pipe(jasmine());
});

gulp.task('compile-integration-test', function() {
    return gulp.src(['src/scripts/timer.js', 'src/scripts/pomodoro.js', 'tests/specs/pomodoro.spec.js'])
        .pipe(concat('integration-test-specs.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('integration-test', ['compile-integration-test'], function() {
    return gulp.src('integration-test-specs.js')
        .pipe(jasmine({
            integration: true,
            vendor: ['tests/lib/jquery-2.1.3.min.js', 'tests/lib/jasmine-jquery.js']
        }));
});

// Default
gulp.task('default', ['lint', 'unit-test', 'integration-test']);