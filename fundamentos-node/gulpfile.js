const gulp = require('gulp')
const server = require('gulp-server-livereload')

gulp.task('build',function(cb){
    console.log('Construyendo el sitio.')
    cb()
})

gulp.task('serve',function(){
    gulp.src('www')
    .pipe(server({
        livereload:true,
        open: true,
    }))
})
