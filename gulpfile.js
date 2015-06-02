var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var contentIncluder = require('gulp-content-includer');
var connect = require('gulp-connect');

var prefix = './wd';
var paths = {
    js : [prefix+ '/mods/unitaryConfig/assets/*.js', prefix+ '/mods/{m_*,p_*}/assets/*.js'],
    css: [prefix+ '/mods/unitaryConfig/assets/*.css', prefix+ '/mods/{m_*,p_*}/assets/*.css']
};

//gulp.task('webserver', function() {
//    connect.server({
////        root:'dist',
//        port: 8001,
//        middleware: function(connect, opt) {
//            return [1,2];
//        }
//    });
//});
////服务
//gulp.task('default', ['webserver']);

//服务
var httpServer = require('./server/httpServer.js');

gulp.task('default', function() {
    httpServer.run();
});

