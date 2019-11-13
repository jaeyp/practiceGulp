//const gulp = require("gulp");
import gulp from "gulp"; // we can export gulp module in JavaScript ES6's way by using babel
import pug from "gulp-pug"; // compile pug templates into HTML or JS
import del from "del"; // delete files and directories using globs (globby - glob pattern matching plugin)
import ws from "gulp-webserver"; // streaming gulp plugin to run a local webserver with LiveReload

const routes = {
  pug: {
    // We should watch all pug files with '**' to support live reloading
    watch: "src/**/*.pug",
    // Here, we only need to route only 1-depth pug files 'cause index.pug extends layout.pug, which contains all sub pug files.
    src: "src/*.pug",
    // This is a way to route all pug files including sub directories, but we don't need to convert each pug files into html here.
    //src: "src/**/*.pug",
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

const watch = () => {
  gulp.watch(routes.pug.watch, pug_stream);
};

/* 
    Series Methods
 */
const prepare = gulp.series([clean]);

const jobs = gulp.series([pug_stream]);

const postjob = gulp.parallel([webserver, watch]);

export const dev = (() => gulp.series([prepare, jobs, postjob]))();
