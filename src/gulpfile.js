/**
 * Created by wadeforever on 2016/12/15.
 */
var rev = require('gulp-rev-append');
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
const gulpLoadPlugins = require('gulp-load-plugins'); // 自动加载插件 省去一个一个require进来
const $ = gulpLoadPlugins();
gulp.task('es6', () => {
    return gulp.src('src/es6/**/*.js')
        .pipe($.watch('src/es6/**/*.js'))
        .pipe($.debug({title: '编译:'}))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())    // 靠这个插件编译
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('js'))
        .pipe(connect.reload());
});
// 定义一个testLess任务（自定义任务名称）
gulp.task('less', function () {
    gulp.src('less/wasteShow3.less') // 该任务针对的文件
    // .pipe($.changed('src/less/index.less'))
        .pipe($.less()) // 该任务调用的模块
        .pipe(rev())
        .pipe($.debug({title: '编译:'}))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload()); // 将会在src/css下生成index.css
});
// 定义一个testLess任务（自定义任务名称）
gulp.task('less1', function () {
    gulp.src('less/yj-ace.less') // 该任务针对的文件
    // .pipe($.changed('src/less/index.less'))
        .pipe($.less()) // 该任务调用的模块
        .pipe(rev())
        .pipe($.debug({title: '编译:'}))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload()); // 将会在src/css下生成index.css
});
// 监听文件修改
gulp.task('watchEs6', ['es6'], function () {
    gulp.watch(['src/es6/**/*.js'], ['es6']);
});
gulp.task('watchLess', ['less'], function () {
    gulp.watch(['less/**/*.less'], ['less']);
});
gulp.task('server', function () {
    connect.server({
        livereload: true,
        root: './',
        port: 8080,
        middleware: function (connect, opt) {
            return [
                proxy('/wcs', {
                    target: 'http://localhost:10081',
                    changeOrigin: true,
                })
            ];
        }
    });
});
gulp.task('default', ['watchEs6', 'watchLess', 'server']);
gulp.task('copy', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));
    gulp.src('template/**/*')
        .pipe(gulp.dest('dist/template'));
    gulp.src('lib/bootstrap/font/*')
        .pipe(gulp.dest('dist/font'));
    gulp.src('lib//ui-grid/font/*')
        .pipe(gulp.dest('dist/font'));
    gulp.src('font/**/*.{eot,otf,svg,ttf,woff,TTF}')
        .pipe(gulp.dest('dist/font'));
    gulp.src('lib/role/font/*')
        .pipe(gulp.dest('dist/font'));
    gulp.src('lib/baiduPlayer/cyberplayer.flash.swf')
        .pipe(gulp.dest('dist'));
    gulp.src('lib/plupload/{Moxie.swf,Moxie.xap}')
        .pipe(gulp.dest('dist/lib/plupload'));
    gulp.src('404.html')
        .pipe(gulp.dest('dist'));
    gulp.src('500.html')
        .pipe(gulp.dest('dist'));
    return gulp.src('font/**/*.{eot,otf,svg,ttf,woff,TTF}')
        .pipe(gulp.dest('dist/styles'));
});
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe($.clean());
});
gulp.task('build', () => {
    var options = {
        removeComments: false, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: false, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, // 删除<style>和<link>的type="text/css"
        minifyJS: false, // 压缩页面里的JS
        minifyCSS: false // 压缩页面里的CSS
    };
    return gulp.src('index.html')
        .pipe($.plumber())
        .pipe($.useref({searchPath: ['app', '.']}))  // 将页面上 <!--endbuild--> 根据上下顺序合并
        .pipe($.if('*.js', $.stripDebug()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', minifycss()))
        .pipe($.if('*.html', $.htmlmin(options)))
        .pipe($.replace('.js"></script>', '.js?rev=@@hash"></script>'))
        .pipe($.replace('.css">', '.css?rev=@@hash">'))
        .pipe(gulp.dest('dist'));
});
gulp.task('html', ['copy', 'build'], function () {
    return gulp.src('dist/index.html').pipe(rev()).pipe(gulp.dest('dist'));
});
gulp.task('text', () => {
    gulp.src('css/text.css')
        .pipe($.cssnano())
        .pipe(gulp.dest('./dist'));
});
