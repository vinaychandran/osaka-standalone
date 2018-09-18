// generated on 2016-12-16 using generator-webapp 2.3.2
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var merge = require('merge-stream');

// const svgSprite = require("gulp-svg-sprites");
// const spritesmith = require('gulp.spritesmith');
var args = require('yargs').argv;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var dev = true;

gulp.task('views', () => {
    return gulp.src('app/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({ pretty: true }))
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({ stream: true }));
});

gulp.task('createCSS', () => {
    var data = ['main-en', 'main-jp', 'main-kr', 'main-tw', 'main-cn'];
    var streams = [];
    data.forEach(function(name) {
        var lang = (name.split('-')[1]) ? name.split('-')[1] : 'jp';
        console.log(lang);
        var stream = gulp.src('app/assets/narita/styles/main.scss')
            .pipe(replace('$locale', lang))
            .pipe(rename(function(path) {
                path.basename = name;
                path.extname = '.scss';
            }))
            .pipe(gulp.dest('app/assets/narita/styles'));
        streams.push(stream);
    });

    return merge(streams);
});

gulp.task('styles', ['createCSS'], () => {

    var locale = (args.locale) ? args.locale : 'jp';
    var cssFile = gulp.src('app/assets/narita/styles/**/*.scss')
        .pipe(replace('$locale', locale))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/assets/narita/styles'))
        .pipe(reload({ stream: true }));
    return cssFile;

});

gulp.task('scripts', () => {
    return gulp.src('app/assets/narita/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/assets/narita/scripts'))
        .pipe(reload({ stream: true }));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe($.eslint({ fix: true }))
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/assets/narita/scripts/**/*.js')
        .pipe(gulp.dest('app/assets/narita/scripts'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js')
        .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['views', 'styles', 'scripts'], () => {
    return gulp.src(['app/**/*.html', '.tmp/**/*.html'])
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
        .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest('dist'));
});

gulp.task('html-dev', ['views', 'styles', 'scripts'], () => {
    return gulp.src(['app/**/*.html', '.tmp/**/*.html'])
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if('*.js', $.uglify({
            mangle: false,
            compress: false,
            output: { beautify: true }
        })))
        .pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/assets/narita/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/assets/narita/images'));
});


// gulp.task('sprite', function () {
//     return gulp.src('app/assets/narita/icons/*.svg')
//         .pipe(svgSprite({
//             selector: "sprite-%f",
//             cssFile: "styles/base/_sprite.scss",
//             padding:10
//         }))
//         .pipe(gulp.dest("app/assets/narita/"));
// });

// gulp.task('sprite-png', function () {
//   var spriteData = gulp.src('app/assets/narita/icons/*.png').pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: '_sprite1.scss'
//   }));
//   return spriteData.pipe(gulp.dest('app/assets/narita/styles/'));
// });
gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/assets/narita/fonts/**/*'))
        .pipe($.if(dev, gulp.dest('.tmp/assets/narita/fonts'), gulp.dest('dist/assets/narita/fonts')));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*',
        '!app/*.html',
        '!app/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['views', 'styles', 'scripts', 'fonts'], () => {
        browserSync.init({
            notify: false,
            port: 9001,
            server: {
                baseDir: ['.tmp', 'app'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([
            'app/**/*.html',
            'app/assets/narita/images/**/*',
            '.tmp/assets/narita/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('app/**/*.pug', ['views']);
        gulp.watch('app/assets/narita/styles/**/*.scss', ['styles']);
        gulp.watch('app/assets/narita/scripts/**/*.js', ['scripts']);
        gulp.watch('app/assets/narita/fonts/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('serve:dist', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 9001,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync.init({
        notify: false,
        port: 9001,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/assets/narita/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('app/assets/narita/scripts/**/*.js', ['scripts']);
    gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/assets/narita/styles/*.scss')
        .pipe($.filter(file => file.stat && file.stat.size))
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/assets/narita/styles'));

    gulp.src('app/layouts/default.pug')
        .pipe(wiredep({
            exclude: ['vanilla-lazyload'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app/layouts'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', /*'extras'*/ ], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('build-dev', ['lint', 'html-dev', 'images', 'fonts', /*'extras'*/ ], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build-dev', gzip: false }));
});

gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean', 'wiredep'], 'build', resolve);
    });
});