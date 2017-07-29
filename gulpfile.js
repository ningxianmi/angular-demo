
var path = require('path');
var gulp = require('gulp');
var del = require("del");//删除文件
var browserSync = require("browser-sync").create();//设置代理
var watchify = require('gulp-watchify');//watchify 加速 browserify 编译
var plumber = require("gulp-plumber");
var streamify = require('gulp-streamify');
var buffer = require('gulp-buffer');
var sourcemaps = require("gulp-sourcemaps");//js文件生成.map文件，调试定位到源码
var uglify = require("gulp-uglify");//js代码压缩
var seq = require("gulp-sequence");
var proxyMiddleware = require('http-proxy-middleware');
var cached = require("gulp-cached");
var jade = require("gulp-jade");//编译jade为html
var less = require("gulp-less");//编译less为css
var prefixer = require("gulp-autoprefixer");
var fontcss = require("gulp-iconfont-css");
var iconfont = require("gulp-iconfont");
var usemin = require('gulp-usemin');// 合并libs引入的文件
var rev = require('gulp-rev');
var rename = require("gulp-rename");//改文件名
var replace =require("gulp-replace");//替换流字符
var babelify = require("babelify");


var TYPE = "DEV";
var FOLDER = "build/";
var ENTRIES = ["src/apps/entries/*.js"];
var CSSMAIN = ["src/assets/style/style.less"];
var CSSDIR = ["src/assets/style/**/*.less"];
var JADES = ["src/views/**/*.jade"];
var IMAGES = ["src/assets/images/**/*"];
var ICONS = ["src/assets/icon/**/*.svg"];

var SERVER_PORT = 8088;

//连接后端接口地址
var SERVER_PROXY = "http://127.0.0.1:9000";
// SERVER_PROXY = "http://spark-3:9000";
SERVER_PROXY = "http://192.168.111.15:9000"; //赵伟
SERVER_PROXY = "http://192.168.55.10:9000";

var config = {
    watch: true,
    cache: {},
    packageCache: {},
    setup: function (bundle) {
        bundle.transform('bulkify');
    }
};
//代理配置
var proxy = proxyMiddleware("/rest", {
    target: SERVER_PROXY,
    changeOrigin: true
});

//删除tmp目录文件
gulp.task("clear", function (cb) {
    del([FOLDER], cb);
});


//把所有需要用到的js用cmd规范打包为一个js，配置在src/enter目录内部
gulp.task("bundle", watchify(function (wf) {
    return gulp.src(ENTRIES)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(wf(config))
        .on("error", function (error) {
            console.dir(error);
            this.emit('close');
            this.emit('end');
        })
        .pipe(streamify(plumber())) //fixed browserify update too early.
        .pipe(buffer())
        //.pipe(uglify())
        .on('error', function(error){console.dir(error);this.emit('end');})
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(FOLDER + "js"));
}));
gulp.task("ug", watchify(function (wf) {
    return gulp.src("tmp/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest(FOLDER + "jws"));
}));
gulp.task("compile-jade",function(){
    var config=(TYPE=='DEV')?{time:""}:{time:"?v="+new Date().getTime()};
    config.type=TYPE;
    return gulp.src(JADES)
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(jade({locals:config}))
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(gulp.dest(FOLDER));
});

gulp.task("compile-style", function (cb) {
    return gulp.src(CSSMAIN)
        // .pipe(plumber())
        .pipe(less())
        // .pipe(prefixer())
        .pipe(gulp.dest(FOLDER + "assets/style"))

});
gulp.task("compile-image", function () {
    return gulp.src(IMAGES, {base: "src"})
        .pipe(cached("debug", {optimizeMemory: true}))
        .pipe(gulp.dest(FOLDER));
});

gulp.task("compile-icon", function () {
    return gulp.src(ICONS, {base: "src"})
        .pipe(fontcss({
            fontName: "icon", path: "src/config/iconfont.css.tpl", targetPath: "icon.css"
        }))
        .pipe(iconfont({fontName: "icon", normalize: true}))
        .pipe(gulp.dest(FOLDER + "assets/fonts"));
});
gulp.task("watch", function (cb) {
    gulp.watch(JADES, ["compile-jade"]);
    gulp.watch(CSSDIR, ["compile-style"]);
    gulp.watch(IMAGES, ["compile-image"]);
    gulp.watch(ICONS,["compile-icon"]);
});


gulp.task('default', ["bundle","compile-jade", "compile-icon",
    "compile-style", "compile-image"]);
gulp.task("dev", ["default"], function () {
    console.log("=========Starting Server=========");
    browserSync.init({
        port: SERVER_PORT,
        ghostMode: false,
        server: FOLDER,
        middleware: [proxy]
    });
    gulp.start("watch");
});

gulp.task("server", seq("clear","dev"));

