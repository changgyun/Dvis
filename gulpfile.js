'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpFilter = require('gulp-filter'),
    jsmin = require('gulp-jsmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    sassdoc = require('sassdoc'),
    reload = browserSync.reload;

var src = {
    base: './',
    app: 'app/',
    main: 'app/public/**/*.html',
    docs: 'app/public/dist/docs/*.html',
    scss: 'app/public/sass/**/*.scss',
    jade: 'app/public/jade/**/*.jade',
    intro: 'app/public/*.jade',
    js: 'app/js/*.js',
    js_c: 'app/js/**/*.js',
    dist: 'app/dist/'
};

// Compiles Sass files into CSS
gulp.task('test', ['sass','resource','jade','js','js_c','intro','watch','sassdoc','server:start']);

gulp.task('sass', function() {
    return gulp.src(['./app/public/sass/stylesheet.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(src.dist + 'css'))
        .pipe(reload({ stream:true }));
});

gulp.task('resource', function() {
    gulp.src('./app/public/sass/resource/**')
        .pipe(gulp.dest(src.dist + 'resource'));
});

gulp.task('jade', function() {
    //var filter = gulpFilter(['*', '!./app/public/jade/layout/*.jade']);
    return gulp.src('./app/public/jade/**/*.jade')
        //.pipe(filter)
        .pipe(jade({
            pretty: true
        })) // pip to jade plugin
        .pipe(gulp.dest(src.dist + 'partials')) // tell gulp our output folder
        .pipe(reload({ stream:true }));
});

gulp.task('js', function () {
    gulp.src('./app/js/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(src.dist + 'js'))
});

gulp.task('js_c', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(src.dist + 'js'))
});

gulp.task('intro', function() {
    return gulp.src('./app/public/*.jade')
        .pipe(jade({
            pretty: true
        })) // pip to jade plugin
        .pipe(gulp.dest(src.dist)) // tell gulp our output folder
        .pipe(reload({ stream:true }));
});

gulp.task('watch', function () {
    gulp.watch(src.scss, ['sass','resource','sassdoc']);
    gulp.watch(src.jade, ['jade','resource']);
    gulp.watch(src.intro, ['intro','resource']);
    gulp.watch(src.js, ['js','jade','intro']);
    gulp.watch(src.js_c, ['js_c','jade','intro']);
    gulp.watch(src.scss).on('change', reload);
    gulp.watch(src.main).on('change', reload);
    gulp.watch(src.docs).on('change', reload);
    gulp.watch(src.intro).on('change', reload);
    gulp.watch(src.js).on('change', reload);
    gulp.watch(src.js_c).on('change', reload);
});

gulp.task('server:start', function() {
    browserSync({
        open: false,
        notify: false,
        port: 3100,
        server: {
            baseDir: [src.dist]
        }
    })
});

gulp.task('sassdoc', function () {
    var options = {
        dest: src.dist + 'docs',
        verbose: true,
        display: {
            access: ["private","public"],
            alias: true,
            watermark: true
        },
        package: "./package.json",
        groups: {
            'undefined': 'general'
        },
        basePath: 'https://github.com/conrad-ko/zeki'
    };
    return gulp.src('./app/public/sass/**/*.scss')
        .pipe(sassdoc(options))
});