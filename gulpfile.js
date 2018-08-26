'use strict';

require('dotenv').config();
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');
const uglify       = require('gulp-uglify');
const sourcemaps   = require('gulp-sourcemaps');
const htmlmin      = require('gulp-htmlmin');
const del          = require('del');
const cleanCSS     = require('gulp-clean-css');
const runSequence  = require('run-sequence');
const concat       = require('gulp-concat');
const gulpIf       = require('gulp-if');
const replace      = require('gulp-replace');
const eslint       = require('gulp-eslint');
const KarmaServer = require('karma').Server;

var minify = false;

// Static Server + watching scss/html files
gulp.task('serve', [], function(done) {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("src/**/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("src/**/*.js", ['js']).on('change', browserSync.reload);
    gulp.watch("src/**/*.html", ['html']).on('change', browserSync.reload);        
    done();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/**/*.scss", { base: 'src/scss' })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpIf(minify, cleanCSS()))
        .pipe(gulp.dest("dist/css"));
});

// process JS files and return the stream.
gulp.task('js', function () {
    gulp.src('src/**/*.js', { base: 'js' })
        .pipe(replace('API_KEY', process.env.API_KEY))
        .pipe(gulpIf(minify, sourcemaps.init()))
        .pipe(concat('all.js'))
        .pipe(gulpIf(minify, uglify()))
        .pipe(gulpIf(minify, sourcemaps.write('.')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', [], function() {
    return gulp.src('src/**/*.html')
        .pipe(gulpIf(minify, htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() { 
    del(['dist/**/*.*']);
});

gulp.task('default', ['serve']);

gulp.task('build', [], function(done) {
    minify = false;
    runSequence(
        'clean',
        ['sass', 'js', 'html'],
        done
    );
});

gulp.task('build-dist', [], function(done) {
    minify = true
    runSequence(
        'clean',
        ['sass', 'js', 'html'],
        done
    );
});

gulp.task('lint', [], function() {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
  