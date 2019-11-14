// const gulp = require("gulp");
// we can export gulp module in JavaScript ES6's way by using babel. check .babelrc
import gulp from "gulp";
import pug from "gulp-pug"; // compile pug templates into HTML or JS
import del from "del"; // delete files and directories using globs (globby - glob pattern matching plugin)
import ws from "gulp-webserver"; // streaming gulp plugin to run a local webserver with LiveReload
import image from "gulp-image"; // Optimize PNG, JPEG, GIF, SVG images with gulp task.
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer"; // add backward compatibility with css for old browser
import csso from "gulp-csso"; // minify CSS
import bro from "gulp-bro"; // browserify
import babelify from "babelify";
import ghPages from "gulp-gh-pages"; // publish contents to Github pages

sass.compiler = require("node-sass");

/**
 * Routes Object
 */
const routes = {
  pug: {
    // We should watch all pug files with '**' to support live reloading
    watch: "src/**/*.pug",
    // Here, we only need to route only 1-depth pug files 'cause index.pug extends layout.pug, which contains all sub pug files.
    src: "src/*.pug",
    // This is a way to route all pug files including sub directories, but we don't need to convert each pug files into html here.
    //src: "src/**/*.pug",
    dest: "build"
  },
  img: {
    watch: "src/img/*",
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/main.js",
    dest: "build/js"
  }
};

/**
 * Task Methods
 */
const taskPug = () =>
  gulp
    .src(routes.pug.src) // read a stream from the routing source
    .pipe(pug()) // pass the stream and pug it
    .pipe(gulp.dest(routes.pug.dest)); // write the stream pugged to the routing destination

const taskImg = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const taskStyle = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest(routes.scss.dest));

const taskJs = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      // https://www.npmjs.com/package/gulp-bro
      bro({
        transform: [
          // https://www.npmjs.com/package/babelify
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }]
        ]
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const clean = () => del(["build", ".publish"]);

// ref. https://www.npmjs.com/package/gulp-webserver
const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const publish = () => gulp.src("build/**/*").pipe(ghPages());

const watch = () => {
  gulp.watch(routes.pug.watch, taskPug);
  // Be careful to add image task into watch task!
  // if image size is big, just running task manually wolud be much better!
  gulp.watch(routes.img.watch, taskImg);
  gulp.watch(routes.scss.watch, taskStyle);
  gulp.watch(routes.js.watch, taskJs);
};

/**
 * Series/Parallel Methods
 */
// img task could take long time in case of big size,
// therefore, we run img task in preparation stage so that we can be sure that all images get ready for other tasks!
const prepare = gulp.series([clean, taskImg]);

const jobs = gulp.series([taskPug, taskStyle, taskJs]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, jobs]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, publish, clean]);
