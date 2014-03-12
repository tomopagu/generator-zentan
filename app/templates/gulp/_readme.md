# <%= _.capitalize(siteName) %>

Loosely based off Grunt Base, gulp base uses the [gulp build system](http://gulpjs.com) rather than grunt.

Quick Intro Slideshow to gulp: [http://slid.es/contra/gulp](http://slid.es/contra/gulp)

## Install

1. Get gulp by running `npm install -g gulp`
2. Run `gulp` twice to initially compile.
3. Run `gulp watch` to watch files for livereload.

## Workflow

1. Run `gulp` to initially compile the site. (May have to run twice)
2. Run `gulp watch` to watch files with livereload as you work.
3. Once done with your work, run `gulp build` to build the site with assets minified & compressed. This is placed in a folder called `/dist`. Go here and double-check the site works/looks as intended.
4. :soon: Finally use `gulp push [demo/live]` to push(ftp) the site to it's respective area.