//const gulp = require("gulp");
import gulp from "gulp"; // we can export gulp module in JavaScript ES6's way by using babel
import pug from "gulp-pug"; // compile pug templates into HTML or JS
import del from "del"; // delete files and directories using globs (globby - glob pattern matching plugin)
import ws from "gulp-webserver"; // streaming gulp plugin to run a local webserver with LiveReload

const routes = {
  pug: {
    src: "src/*.pug", // route 1depth pug files
    //src: "src/**/*.pug", // route all pug files including sub directories
    dest: "build"
  }
};

// gulp.src() - creates a pug files' stream for reading Vinyl objects (metadata) from the file system
// gulp.dest() - creates a stream for writing Vinyl objects to the file system.
const pug_stream = () =>
  gulp
    .src(routes.pug.src) // read a stream from the routing source
    .pipe(pug()) // pass the stream and pug it
    .pipe(gulp.dest(routes.pug.dest)); // write the stream pugged to the routing destination

const clean = () => del(["build"]);

// ref. https://www.npmjs.com/package/gulp-webserver
const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

/* 
    Series Methods
 */
const prepare = gulp.series([clean]);

const jobs = gulp.series([pug_stream]);

const postjob = gulp.series([webserver]);

export const dev = (() => gulp.series([prepare, jobs, postjob]))();
