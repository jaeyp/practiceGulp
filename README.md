---
title: 'Practice Gulp'
disqus: hackmd
---

Practice Gulp <span style="color:#2B6CB0;font-size:22px">**mini static site generator**</span>  
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)
  
* This is a tutorial project representing ***how to bundle web application within less than a hundred lines of codes over Gulp + Browserify***.

* **What does this project include?**  
Source | Pug to HTML | SCSS to CSS | Optimize Images | JS ES6+ to ES5 | Minify | Browserify | Babelify | Uglifyify | Deploy | Output

* **React with CRA + Others with Gulp + No Webpack = Peace of Mind**
* Check [demo site](https://jaeyp.github.io/practiceGulp/) and [gulpfile.babel.js](https://github.com/jaeyp/practiceGulp/blob/master/gulpfile.babel.js)

## Table of Contents

* [How to setup new Gulp project from scratch](#How-to-setup-new-Gulp-project-from-scratch)  
* [How to run this project](#How-to-run-this-project)  
* [Directories and Files](#Directories-and-Files)
 

How to setup new Gulp project from scratch
---
```bash
# 1. create project folder
~$ mkdir project_name
~$ cd project_name

# 2. initialize git
~$ git init

# 3. scaffold directories & files

# 4. create new repository on github

# 5. add the repository on project
# set remote repository
~$ git remote add origin <repository-url>
# pull repository regardless of history
~$ git pull origin master --allow-unrelated-histories
# initial commit
~$ git commit -am "initial commit"
~$ git push origin master

# 6. install Gulp
~$ npm i gulp-cli -g
~$ npm i gulp -D
# create a gulpfile
~$ npm -p touch nodetouch gulpfile.js
# or simply,
~$ touch gulpfile.js

# 7. install Babel packages
~$ npm i @babel/register @babel/core -D
# 7-1. install preset-env in order to use preset instead of adding lots of babel plugins in .babelrc
~$ npm i @babel/preset-env -D
# 7-2. create and edit .babelrc
  { 
    # we can define "presets:" instead of "plugins:"
    # presets is like a bundle package (collection of plugins)
    # official plugins:
    #    @babel/preset-env
    #    @babel/preset-flow
    #    @babel/preset-react
    #    @babel/preset-typescript

    "presets": ["@babel/preset-env"]
    # with this setting, all the plugins to enable transforms for ES2015+ are installed at once.
  }

# 8. edit package.json
  "scripts": {
    ...
    "dev": "gulp dev",
    "build": "gulp build"
    "deploy": "gulp deploy"
  },

# 9. install gulp-pug to convert pug templates to html
~$ npm i gulp-pug -D


# 10. install del to clear existing dest (build directory) on task
~$ npm i del -D

# 11 install gulp-webserver for live testing on development
~$ npm i gulp-webserver -D

# 12. install gulp-image to optimize image file
~$ npm i gulp-image -D # or gulp-imagemin

# 13. install gulp-sass to convert SASS/SCSS to CSS
~$ npm i node-sass gulp-sass -D

# 14. install gulp-autoprefixer for browser backward compatibility
~$ npm i gulp-autoprefixer -D
# 14-1. add browserslist in package.json
  "browserslist": [ # Be careful! it's a bracket! not curly bracket!
    "last 2 version"
  ]

# 15. install gulp-csso to minify CSS
~$ npm i gulp-csso -D # or gulp-cssnano

# 16. install browserify plugin "gulp-bro" in order to allows developers
#     to write Node.js-style modules that compile for use in the browser
# What is browserify? Simply, it allows us to use require() in the browser!
~$ npm i gulp-bro -D

# 17. install babelify plugin to transform JS ES6+ to ES5
~$ npm i babelify -D

# 18. install uglifyify plugin to make JS ugly
~$ npm i uglifyify -D

# 19. install gulp-gh-pages plugin to publish contents to Github pages
~$ npm i gulp-gh-pages -D

# 20. just develop anything and deploy it
# build source codes
- npm run build
# run live server at http://localhost:8000
- npm run dev
# publish project to https://your_github_account.github.io/project_name/
- npm run deploy
```

How to run this project
---
```bash
~$ git clone https://github.com/jaeyp/practiceGulp
~$ cd practiceGulp
~$ npm install
~$ npm run dev
# Check gulpfile.babel.js
```

Directories and Files
---
```bash
.
├── img/       # image files
├── js/        # JavaScript files     
├── scss/      # SCSS files
├── partials/  # partial pug files
├── templates/ # pug template files
├── index.pug
└── gulpfile.babel.js # task runner
```

### License

MIT © [Jaehyun Park](https://portfolio.jaeyp.xyz).

###### tags: `Project` `Document`
