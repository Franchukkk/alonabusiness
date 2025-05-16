import browserSync from "browser-sync";
import gulp from "gulp";
import del from "del";
import pug from "gulp-pug";
import coreSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";
import imagemin from "gulp-imagemin";
import cache from "gulp-cache";
import gcmq from "gulp-group-css-media-queries";
import cleanCSS from "gulp-clean-css";

const sass = gulpSass(coreSass);
const bs = browserSync.create();

// Старт серверу
export const browserSyncFunc = () => {
    bs.init({
        server: {
            baseDir: "docs"
        },
        open: true,
        browser: "brave" // або chrome, firefox, safari — залежно від системи
    });
};

// Компільовання Pug -> HTML
export const html = () => {
    return gulp
        .src("src/pug/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("docs"))
        .pipe(bs.stream());
};

// Компільовання SASS/SCSS -> CSS
export const css = () => {
    return gulp
        .src("src/sass/**/*.+(sass|scss)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 15 versions"], cascade: true }))
        .pipe(gcmq())
        .pipe(concat("styles.css"))
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("docs/css"))
        .pipe(bs.stream());
};

// JS
export const js = () => {
    return gulp
        .src("src/js/**/*.js")
        .pipe(uglify.default())
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest("docs/js"))
        .pipe(bs.stream());
};

// Копіювання файлів (favicon тощо)
export const files = () => {
    return gulp
        .src("src/*.*", { dot: true })
        .pipe(gulp.dest("docs"))
        .pipe(bs.stream());
};

// Шрифти
export const fonts = () => {
    return gulp
        .src("src/fonts/**/*.*")
        .pipe(gulp.dest("docs/fonts"))
        .pipe(bs.stream());
};

// Зображення
export const images = () => {
    return gulp
        .src("src/img/**/*")
        .pipe(cache(imagemin()))
        .pipe(gulp.dest("docs/img"))
        .pipe(bs.stream());
};

// Очистка кешу
export const clear = () => {
    return cache.clearAll();
};

// Видалення docs/
export const delDocs = () => {
    return del("docs");
};

// Слідкування за файлами
export const watch = () => {
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.series(css));
    gulp.watch("src/js/**/*.js", gulp.series(js));
    gulp.watch("src/pug/**/*.pug", gulp.series(html));
    gulp.watch("src/*.*", gulp.series(files));
    gulp.watch("src/fonts/**/*.*", gulp.series(fonts));
    gulp.watch("src/img/**/*.*", gulp.series(images));
};

// Збірка за замовчуванням
export default gulp.series(
    delDocs,
    gulp.parallel(
        html,
        css,
        js,
        files,
        fonts,
        images
    ),
    gulp.parallel(
        watch,
        browserSyncFunc
    )
);
