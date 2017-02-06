const gulp = require('gulp');
const ts = require('gulp-typescript');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task ('others', () => {  
  gulp.src('src/**/*.json').pipe(gulp.dest('dist'));
  gulp.src('src/**/*.jade').pipe(gulp.dest('dist'));
});

gulp.task ('swagger', () => {  
  gulp.src('src/**/*.js').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);
