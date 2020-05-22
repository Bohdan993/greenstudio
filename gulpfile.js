const { src, dest, parallel, series } = require('gulp');
const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const prefixer = require('autoprefixer');
const conct = require('gulp-concat');
const uglify = require('gulp-uglify');
const watching = require('gulp-watch');
const del = require('del');
const pugToHtml = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sourcemap = require('gulp-sourcemaps');
const img = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const spritesmith = require('gulp.spritesmith');
const webpack = require('webpack-stream');
const gulpif = require('gulp-if');
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");
let smartgrid = require('smart-grid');


let isDev = true;
let isProd = !isDev;

let webConfig = {
    output: {
        filename: 'script.min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, ],
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none'
};

let webConfig2 = {
    output: {
        filename: 'libs.min.js'
    }
};

// gulp.task('optimize', () => {
//   return gulp.src('./app/img/**/*.*')
//     .pipe(imagemin([
//       imagemin.gifsicle({
//         interlaced: true,
//       }),
//       imagemin.optipng({
//         optimizationLevel: 5,
//       }),
//       imageminMozjpeg({
//         progressive: true,
//         quality: 80,
//       }),
//     ]))
//     .pipe(gulp.dest('./dist/img'));
// });


var plugin = [
    prefixer({ browsers: ['> 0.01%'] })

];


var settings = {
    outputStyle: 'less',
    /* less || scss || sass || styl */
    columns: 12,
    /* number of grid columns */
    offset: '30px',
    /* gutter width px || % || rem */
    mobileFirst: false,
    /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1140px',
        /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px',
            /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        },
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */

        xxs: {
            width: '440px'
        }
    }
};



// TEST //
// const imageminJpegRecompress = require('imagemin-jpeg-recompress');
// const pngquant = require('imagemin-pngquant');
// const imageminOptipng = require('imagemin-optipng');
// const imgmin = require('imagemin');


// (async () => {
//     await imgmin(['images/*.png'], 'build/images', {
//         plugins: [
//             pngquant()
//         ]
//     });


function compress() {
    return src('./app/testimg/**/*.*')

    .pipe(img({
                progressive: true,
                use: [imageminMozjpeg({
                        quality: 70
                    }),
                    pngquant()
                ],
                interlaced: true
            }


            //     [
            //     img.jpegtran({progressive: true}),
            //     img.optipng({optimizationLevel: 5})
            // ]


            // {optimizationLevel: 5}




        ))
        // .pipe(imgmin(
        //     [
        //     	imageminOptipng()
        //     ]
        // 	))

    .pipe(dest('./dist/testimg'));

}

// END TEST //


function smart() {
    smartgrid('./app/less', settings);
}


function fonts() {
    return src('./app/fonts/**/*')
        .pipe(dest('./dist/fonts'))
        .pipe(browserSync.stream());;

}



function css() {
    return src('./app/less/**/main.less')
        .pipe(changed('./dist/css/', {
            extension: '.css',
            hasChanged: changed.compareContents
        }))
        .pipe(sourcemap.init())
        // .pipe(conct('style.min.less'))
        .pipe(less({
            includePaths: ['node_modules']
        }))
        .pipe(minifyCSS({
            level: 2
        }))

    // .pipe(autoprefixer({
    //         browsers: ['> 0.01%'],
    //         cascade: false
    //     }))

    .pipe(postcss(plugin))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemap.write('./maps'))

    .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}


function scripts() {
    return src('./app/js/main.js')
        // .pipe(sourcemap.init())
        // .pipe(conct('script.js'))
        .pipe(gulpif(isProd, uglify({})))

    // .pipe(rename({suffix: '.min'}))
    .pipe(plumber())
        .pipe(webpack(webConfig))
        // .pipe(sourcemap.write('./maps'))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());

}

function libs() {
    return src('./app/libs/libs.js')
        // .pipe(conct('libs.js'))
        // .pipe(uglify({
        //     }))
        // .pipe(rename({suffix: '.min'}))
        .pipe(plumber())
        .pipe(webpack(webConfig2))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());

}


function libsCSS() {
    return src('./app/libsCSS/**/*.less')
        .pipe(sourcemap.init())
        .pipe(conct('libs.less'))
        .pipe(less())
        .pipe(minifyCSS({
            level: 2
        }))
        .pipe(postcss(plugin))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemap.write('./maps'))

    .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());

}


function images() {
    return src('./app/img/**/*.*')

    .pipe(img(

        //     [
        //     img.jpegtran({progressive: true}),
        //     img.optipng({optimizationLevel: 5})
        // ]


        // {optimizationLevel: 5}


        [
            imageminMozjpeg({
                quality: 70
            })
            // img.optipng({optimizationLevel: 3})
        ]

    ))

    .pipe(dest('./dist/img'))
        .pipe(browserSync.stream());

}


// function convertToWebp () {
//     const src2 = './app/img/**/*.png'
//     const dest2 = './dist/img'
//     return src(src2)
//     .pipe(plumber())
//     .pipe(img([webp({quality: 75})]))
//     // .pipe(img([img.webp({quality: 75})]))
//     .pipe(extReplace(".webp"))
//     .pipe(dest(dest2))
//     .pipe(browserSync.stream());
// }



function sprites() {
    return src('./app/img/sprites/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(dest('./dist/img/sprites/svg'))
        .pipe(browserSync.stream());
}




function spritesPNG() {
    var spriteData = src('./app/img/sprites/png/*.png') // путь, откуда берем картинки для спрайта
        .pipe(plumber()) // plumber
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.less',
            cssFormat: 'less',
            algorithm: 'binary-tree',
            cssTemplate: './app/less/less.template.handlebars',
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name
            }
        }));

    spriteData.img.pipe(dest('./dist/img/sprites/png')); // путь, куда сохраняем картинку
    spriteData.css.pipe(dest('./app/less')) // путь, куда сохраняем стили
        .pipe(browserSync.stream());
}




function pug() {
    return src('./app/*.pug')
        // .pipe(changed('./dist', {
        //     extension: '.html',
        //     hasChanged: changed.compareLastModifiedTime
        // }))
        .pipe(plumber()) // plumber
        .pipe(pugToHtml({
            pretty: true
        }))
        .pipe(rename({ dirname: '' }))

    .pipe(dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
}



function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        // tunnel: true,
        notify: false
    });
    gulp.watch('./app/less/**/*.less', css);
    gulp.watch('./app/js/**/*.js', scripts);
    gulp.watch('./app/libs/**/*.js', libs);
    gulp.watch(['./app/img/**/*', '!./app/img/sprites/**/*'], images);
    gulp.watch('./app/img/sprites/svg/*.svg', sprites);
    gulp.watch('./app/img/sprites/png/*.png', spritesPNG);
    gulp.watch('./app/libsCSS/**/*.less', libsCSS);
    gulp.watch('./app/fonts/**/*', fonts);
    gulp.watch('./app/**/*.pug', pug);
    // gulp.watch('./app/img/**/*.{jpg,png}', convertToWebp);
    gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
}


function clean() {
    return del(['dist/*', '!dist/*.html']);
}



exports.css = css;
// test
exports.compress = compress;
// 
exports.scripts = scripts;
exports.libsCSS = libsCSS;
exports.smart = smart;
exports.libs = libs;
exports.images = images;
exports.fonts = fonts;
// exports.html = html;
exports.pug = pug;
// exports.convertToWebp = convertToWebp;
exports.sprites = sprites;
exports.spritesPNG = spritesPNG;
exports.watch = watch;
exports.clean = clean;
exports.build = series(clean,
    parallel(watch, css, scripts, images, libs, fonts, libsCSS, pug, sprites, spritesPNG)
);