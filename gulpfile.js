// Подключаем необходимые модули
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const prefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const fileinclude = require('gulp-file-include')
const gcmq = require('gulp-group-css-media-queries')
const concat = require('gulp-concat')

const babel = require('gulp-babel')

// Задача для сборки HTML
gulp.task('html', function (done) {
  return gulp
    .src('dev/*.html') // Берем исходники
    .pipe(fileinclude()) // Вставляем файлы вместо директив препроцессора
    .pipe(gulp.dest('public')) // Выгружаем результат в папку public
    .pipe(browserSync.stream()) // Обновляем страницу в браузере
  done() // Вызываем коллбэк для сообщения о завершении задачи
})

// Задача для сборки CSS
gulp.task('css', function (done) {
  return gulp
    .src('dev/assets/style.sass') // Берем исходники
    .pipe(sass()) // Компилируем Sass в CSS
    .pipe(prefixer()) // Добавляем префиксы
    .pipe(gcmq()) // Группируем медиа-запросы
    .pipe(cssmin()) // Минифицируем CSS
    .pipe(gulp.dest('public/css/')) // Выгружаем результат в папку public/css
    .pipe(browserSync.stream()) // Обновляем страницу в браузере
  done() // Вызываем коллбэк для сообщения о завершении задачи
})

// Задача для сборки JS
gulp.task('js', function (done) {
  return gulp
    .src('dev/**/*.js') // Берем исходники
    .pipe(fileinclude()) // Вставляем файлы вместо директив препроцессора
    .pipe(uglify()) // Минифицируем JS
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(concat('main.js')) // объединяем все js файлы в один с именем bundle.js
    .pipe(gulp.dest('public/')) // Выгружаем результат в папку public/js
    .pipe(browserSync.stream()) // Обновляем страницу в браузере
  done() // Вызываем коллбэк для сообщения о завершении задачи
})

// Задача для копирования шрифтов
gulp.task('fonts', function (done) {
  gulp
    .src('dev/assets/fonts/*.*') // Берем исходники
    .pipe(gulp.dest('public/fonts/')) // Выгружаем результат в папку public/fonts
    .pipe(browserSync.stream()) // Обновляем страницу в браузере
  done() // Вызываем коллбэк для сообщения о завершении задачи
})

// Задача для запуска локального сервера и отслеживания изменений
gulp.task('serve', function (done) {
  browserSync.init({
    server: 'public', // указываем папку, которую должен отдавать сервер
  })

  // следим за изменениями в html-файлах и обновляем браузер
  gulp
    .watch('dev/**/*.html', gulp.series('html'))
    .on('change', browserSync.reload)

  // следим за изменениями в sass-файлах, компилируем их в css, применяем префиксы, группируем медиа-запросы, минифицируем и обновляем стили на странице
  gulp
    .watch('dev/**/*.sass', gulp.series('css'))
    .on('change', browserSync.reload)

  // следим за изменениями в js-файлах, объединяем, минифицируем и обновляем скрипты на странице
  gulp.watch('dev/**/*.js', gulp.series('js')).on('change', browserSync.reload)

  // следим за изменениями в шрифтах и обновляем их на странице
  gulp
    .watch('dev/assets/fonts/.', gulp.series('fonts'))
    .on('change', browserSync.reload)

  done()
})

gulp.task('default', gulp.series('html', 'css', 'js', 'fonts', 'serve'))
