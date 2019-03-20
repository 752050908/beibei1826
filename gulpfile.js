//导入所需插件 
const gulp = require('gulp'),
	  uglify = require('gulp-uglify'),
	  rename = require('gulp-rename'),
	  concat = require('gulp-concat');
const babel = require('gulp-babel');
const cssmin = require("gulp-cssmin");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")
	  
//发布任务
//es6===>es5
/*gulp.task('es6',()=>{
	 gulp.src('src/ES6JS/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./src/ES5JS'))
})*/
//处理js任务
/*gulp.task('js',function(){
	gulp.src('./src/ES5JS/*.js')
	.pipe(uglify())
	//.pipe(rename({"suffix" : ".min"}))
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('./src/srcJs'));
})*/