var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('sass', function(done) {
    gulp
        .src('sass/custom.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('css'));
    done();
});

gulp.task('sass-watch', function(done) {
    gulp
        .watch(
            'sass/custom.scss',
            gulp.series('sass'));
});
