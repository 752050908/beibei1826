//导入所需插件 
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');



	 
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
		presets:["@babel/env"]
	}))
	.pipe(uglify())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dest/Es5js"))
})

 gulp.task("watch",function  () {
 	gulp.watch(["./src/scss/*.scss","./src/Es6js/*.js"],["sassmin","babelUglify"])
 })
