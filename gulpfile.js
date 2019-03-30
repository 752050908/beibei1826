//导入所需插件 
const gulp = require('gulp'); 

const rename = require('gulp-rename'); //重命名{需要参数}
const concat = require('gulp-concat');//合并文件 需要参数

const cssmin = require('gulp-cssmin');//压缩css
const imagemin = require('gulp-imagemin');//压缩图片
const sass = require('gulp-sass');//scss文件转css
const uglify = require('gulp-uglify'); //压缩js文件


	 
gulp.task("sassmin",function(){
	gulp.src("./src/scss/*.scss")
	.pipe(sass())
	.pipe(cssmin())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dest/css"))
})

gulp.task("babelUglify",function  () {
	gulp.src("./src/Es6js/*.js")
	.pipe(babel({
		presets:[es2015]
	}))
	.pipe(uglify())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dest/Es5js"))
})
//gulp.task("toes5",function(){
//	gulp.src("./src/Es6js/*.js").pipe( babel() ).pipe( gulp.dest("dest/Es5js") )
//})
//gulp.task("babelUglify",function(){
//	gulp.src("./src/Es6js/*.js").pipe(babel({
//		presets:[es2015]
//	})).pipe( uglify() )
//								.pipe( rename({"suffix":".min"})
//								.pipe(gulp.dest("dest/Es5js")) )
//})
gulp.task("imagemin",function(){
	gulp.src("./src/image/*.*")
	.pipe(imagemin())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dest/images"))
})

 gulp.task("watch",function  () {
 	gulp.watch(["./src/scss/*.scss","./src/Es6js/*.js"],["sassmin","babelUglify","imagemin"])
 })
