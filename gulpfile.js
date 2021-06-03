const gulp = require('gulp');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
// const imageoptim = require('gulp-image-optimize');
const uglify = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    // .pipe(gulp.dest('demo'))
    .pipe(browserSync.reload({ stream: true }));
});

// gulp.task('img', function() {
//   return gulp.src('src/img/**/*')
//       .pipe(imageoptim())
//       .pipe(gulp.dest('public/img'))
// }); 

// gulp.task('css', function() {
//   return gulp.src('src/css/*.css')
//       .pipe(concat('style.min.css'))
//       .pipe(cleancss())
//       .pipe(gulp.dest('public/css'))
// });

// gulp.task('scss', function() {
//   return gulp.src('src/scss/*.scss')
//       .pipe(scss())
//       .pipe(autoprefixer({
//           cascade: false
//       }))
//       .pipe(gulp.dest('src/css'))
//       .pipe(browserSync.stream());
// });

// gulp.task('js', function() {
//   return gulp.src('src/js/*.js')
//       .pipe(rename('scripts.min.js'))
//       .pipe(uglify())
//       .pipe(gulp.dest('public/js'))
// });

gulp.task('js', function() {
  return gulp.src('src/*.js')
    // .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
      server: {
        baseDir: 'src'
      }
  });
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', gulp.parallel('html'));
  gulp.watch('src/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('watch', 'serve'));