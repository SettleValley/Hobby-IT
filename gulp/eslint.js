var gulp = require('gulp');
 var eslint = require('gulp-eslint');

module.exports = function(){
    gulp.task('eslint', function(){
        return gulp.src([
            '../**/*.js',
            '!public/bower_componentes/**/*.js'
        ])
        .pipe(eslit())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    });
}
