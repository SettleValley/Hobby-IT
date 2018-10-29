import gulp from "gulp";

// import task
gulp.task('lint', require('./gulp/eslint'));

//task
gulp.task('analyze', ['lint']);
gulp.task('pre-push', ['lint']);
