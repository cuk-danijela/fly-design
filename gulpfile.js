const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uncss = require('gulp-uncss');

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('images/**/*')
    .pipe(imageMin([
        imageminWebp({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist/images'))
);


// Minify JS
gulp.task('minify', async function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

// Remove unused CSS
gulp.task('uncss', async function () {
    gulp.src('css/*.css')
        .pipe(uncss({
            html: ['index.html', '/*.html']
        }))
        .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('cleancss', async function () {
    gulp.src('css/*.css')
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

// Concat JS Scripts
gulp.task('scripts', async function () {
    gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

// Prefixer CSS
gulp.task('autoprefixer', async function () {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

// Copying Fonts to Dist
gulp.task('fonts', function () {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
})

gulp.task('watch', async function () {
    gulp.watch('js/*.js', gulp.series('scripts'));
    gulp.watch('images/*', gulp.series('imageMin'));
    gulp.watch('css/*.css', gulp.series('cleancss'));

})

// Default functions
gulp.task('default', gulp.parallel(['imageMin', 'minify', 'autoprefixer', 'fonts', 'uncss', 'cleancss', 'scripts']));

