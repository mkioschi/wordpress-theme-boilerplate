var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

gulp.task('default', ['sass', 'js', 'img']);

gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat('style.min.scss'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function () {
    return gulp.src('assets/src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('img', function () {
    gulp.src('assets/src/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('assets/img'));
});