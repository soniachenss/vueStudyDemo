
var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    base64 = require('gulp-base64');


gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});



gulp.task('Less', function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(minify())
        .pipe(gulp.dest('src/css'));
});
//编译css

//默认任务
gulp.task('watch',function(){
    gulp.watch('src/less/*.less',['Less']);
});

//压缩html
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: false,
        collapseBooleanAttributes: false,
        removeEmptyAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩JS
        minifyCSS: true//压缩CSS
    };
    gulp.src('dist/Portal/media.html')
        .pipe(htmlmin(options))
        .pipe(rename('basicmin.html'))
        .pipe(gulp.dest('dist/Portal'));
});



gulp.task('build', function () {
    return gulp.src('src/css/*.min.css')
        .pipe(base64({
            baseDir: 'public',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('default',['Less']);