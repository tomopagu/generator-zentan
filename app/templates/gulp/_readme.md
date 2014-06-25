# <%= _.capitalize(siteName) %>

Loosely based off Grunt Base, gulp base uses the [gulp build system](http://gulpjs.com) rather than grunt.

Quick Intro Slideshow to gulp: [http://slid.es/contra/gulp](http://slid.es/contra/gulp)

## Install
1. Grab [NodeJS](http://nodejs.org/).
2. If you don't have Gulp or Bower, open up your Terminal and run `npm install -g gulp && npm install -g bower`.
3. Clone this repo to a folder.
4. Next inside this folder open up your Terminal again and type `npm install && bower install` to get the dependencies.
5. Lastly run `gulp` twice to initially compile the site.

## Workflow

1. Run `gulp` to initially compile the site. (May have to run twice)
2. Run `gulp watch` to watch files with livereload as you work.
3. Once done with your work, run `gulp build` to build the site with assets minified & compressed. This is placed in a folder called `/dist`. Go here and double-check the site works/looks as intended.
