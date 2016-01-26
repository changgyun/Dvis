'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var src = {
    dist: './dist/',
    base: './',
    watch_sass: './sass/**/*',
    watch_html: './**/*.html'
};

gulp.task('test', ['sass','resource','watch','server:start']);

gulp.task('sass', function() {
    return gulp.src(['./sass/stylesheet.scss'])
        //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.dist + 'css'))
        .pipe(reload({ stream:true }));
});

gulp.task('resource', function() {
    gulp.src('./sass/resource/**')
        .pipe(gulp.dest(src.dist + 'resource'));
});

gulp.task('watch', function () {
    gulp.watch(src.watch_html, ['sass','resource']);
    gulp.watch(src.watch_sass, ['sass','resource']);
    gulp.watch(src.watch_html).on('change', reload);
    gulp.watch(src.watch_sass).on('change', reload);
});

gulp.task('server:start', function() {
    browserSync({
        open: false,
        notify: false,
        port: 3100,
        server: {
            baseDir: [src.base]
        }
    })
});
