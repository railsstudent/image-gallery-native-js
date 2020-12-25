'use strict'

require('dotenv').config()
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const runSequence = require('gulp4-run-sequence')
const concat = require('gulp-concat')
const gulpIf = require('gulp-if')
const KarmaServer = require('karma').Server
var minify = false

// Static Server + watching scss/html files
gulp.task(
    'serve',
    gulp.series(function (done) {
        browserSync.init({
            server: './dist',
        })
        gulp.watch(['src/**/*.scss', '!src/scss/tailwind.scc'], gulp.series('sass')).on('change', browserSync.reload)
        gulp.watch('src/**/*.js', gulp.series('js')).on('change', browserSync.reload)
        gulp.watch('src/**/*.html', gulp.series('html')).on('change', browserSync.reload)
        done()
    }),
)

// Compile sass into CSS & auto-inject into browsers
gulp.task(
    'sass',
    gulp.series(function () {
        const purgecss = require('@fullhuman/postcss-purgecss')
        const cssnano = require('cssnano')
        const postcss = require('gulp-postcss')
        const autoprefix = require('autoprefixer')

        const plugins = minify
            ? [
                  autoprefix,
                  cssnano({
                      preset: 'default',
                  }),
                  purgecss({
                      content: ['src/**/*.html', 'src/**/*.js'],
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                  }),
              ]
            : [autoprefix]
        return gulp
            .src(['src/**/*.scss', '!src/scss/tailwind.scss'], { base: 'src/scss' })
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(plugins))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/css'))
    }),
)

// process JS files and return the stream.
gulp.task(
    'js',
    gulp.series(function () {
        const replace = require('gulp-replace')
        const babel = require('gulp-babel')
        return gulp
            .src('src/**/*.js', { base: 'js' })
            .pipe(replace('API_KEY', process.env.API_KEY))
            .pipe(gulpIf(minify, sourcemaps.init()))
            .pipe(babel())
            .pipe(concat('all.js'))
            .pipe(gulpIf(minify, uglify()))
            .pipe(gulpIf(minify, sourcemaps.write('.')))
            .pipe(gulp.dest('dist/js'))
    }),
)

gulp.task(
    'html',
    gulp.series(function () {
        return gulp
            .src('src/**/*.html')
            .pipe(
                gulpIf(
                    minify,
                    htmlmin({
                        collapseWhitespace: true,
                        removeComments: true,
                        minifyJS: true,
                    }),
                ),
            )
            .pipe(gulp.dest('dist'))
    }),
)

gulp.task(
    'clean',
    gulp.series(function (done) {
        del(['dist/**/*.*'])
        done()
    }),
)

gulp.task('default', gulp.series('serve'))

gulp.task(
    'build',
    gulp.series(function (done) {
        minify = false
        runSequence('clean', ['sass', 'js', 'html'], done)
    }),
)

gulp.task(
    'build-dist',
    gulp.series(function (done) {
        minify = true
        runSequence('clean', ['sass', 'js', 'html'], done)
    }),
)

gulp.task(
    'lint',
    gulp.series(function () {
        const eslint = require('gulp-eslint')
        return gulp
            .src(['src/**/*.js', 'test/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
    }),
)

gulp.task(
    'clean-coverage',
    gulp.series(function (done) {
        del(['dist/coverage'])
        done()
    }),
)

/**
 * Run test once and exit
 */
gulp.task(
    'test',
    gulp.series(function (done) {
        runSequence('clean-coverage', done)
        new KarmaServer(
            {
                configFile: __dirname + '/karma.conf.js',
                singleRun: true,
            },
            done,
        ).start()
    }),
)
