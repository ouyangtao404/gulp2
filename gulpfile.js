var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

//web服务
var httpServer = require('./server/httpServer.js');

var prefix = './wd';
var paths = {
    js : [prefix+ '/mods/unitaryConfig/assets/*.js', prefix+ '/mods/{m_*,p_*}/assets/*.js'],
    css: [prefix+ '/mods/unitaryConfig/assets/*.css', prefix+ '/mods/{m_*,p_*}/assets/*.css']
};

//js合并
gulp.task('combineJs', function() {
    gulp.src(paths.js)
        .pipe(concat('combine.js'))
        .pipe(gulp.dest(prefix+ '/publish/'))
        .pipe(uglify())
        .pipe(rename('combine.min.js'))
        .pipe(gulp.dest(prefix+ '/publish/'));
});

//css合并
gulp.task('combineCss', function() {
    gulp.src(paths.css)
        .pipe(concat('combine.css'))
        .pipe(gulp.dest(prefix+ '/publish/'))
        .pipe(minifyCss())
        .pipe(rename('combine.min.css'))
        .pipe(gulp.dest(prefix+ '/publish/'));
});

//合并库和框架
gulp.task('lib', function() {
    gulp.src([prefix+ '/publish/jquery/*.min.js', prefix+ '/publish/backbone/*.min.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(prefix+ '/publish/'));
});

//合并库和框架
gulp.task('lib', function() {
    gulp.src([prefix+ '/publish/jquery/*.min.js', prefix+ '/publish/backbone/*.min.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(prefix+ '/publish/'));
});

gulp.task('default', function() {
    //合并库和框架（因为修改的可能性较少，就初始化的时候执行，而不监听变化，提高效率）
    gulp.run('lib');

    //监听好js和css的变化，即时合并（css和js监听相关文件的change事件，而html的响应依赖web服务的请求事件）
    gulp.run('combineJs');
    gulp.watch(prefix+ '/mods/**/*.js', function() {
        gulp.run('combineJs');
    });
    gulp.run('combineCss');
    gulp.watch(prefix+ '/mods/**/*.css', function() {
        gulp.run('combineCss');
    });

    //监听变化
    var watcher = gulp.watch(prefix+ '/mods/**/*.js');
    watcher.on('add', function(e) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    watcher.on('deleted', function(e) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    httpServer.run();
});