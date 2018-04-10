var gulp = require("gulp");
var uglify = require('gulp-uglify');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("src/tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(uglify())
        .pipe(gulp.dest("king"));
});