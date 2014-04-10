# generator-zentan
[![TravisCI Build Status](https://travis-ci.org/Tomo-san/generator-zentan.svg?branch=master)](https://travis-ci.org/Tomo-san/generator-zentan)
[![Dependencies](https://david-dm.org/tomo-san/generator-zentan.png)](https://david-dm.org/tomo-san/generator-zentan)

## Grunt / Gulp Frontend Generator

### What is it?
Based on the generator I created for my workplace, zentan is the testbed before things get merged into the workplace generator aswell as utilizing tools such as Travis-CI and David.dm which we don't use at work.

#### What can it do

generator-zentan first asks you what the project name is and then asks you whether you would like to use Grunt or gulp for the build processes.

The Grunt Task:
- Lints JS & Coffee Files (`grunt-contrib-jshint` & `grunt-coffeelint`)
- Converts Coffee to JS (`grunt-contrib-coffee`)
- Can Uglify JS Files (Off by Default) (`grunt-contrib-uglify`)
- Converts LESS to CSS (`grunt-recess`)
- Uses UnCSS to remove unused CSS (`grunt-uncss`)
- Cleans directories (`grunt-contrib-clean`)
- Copies files from directories to another (`grunt-contrib-copy`)
- Concats Files (`grunt-contrib-concat`)
- Processes HTML files (`grunt-processhtml`)
- Watches files and runs tasks on changes + reloads browsers - `grunt auto`. (`grunt-contrib-watch` & `grunt-browser-sync`)

The gulp task:
- Cleans directories (`gulp-clean` & `gulp-rimraf`)
- Lints JS & Coffee Files (`gulp-jshint` & `gulp-coffeelint`)
- Converts Coffee to JS (`gulp-coffee`)
- Uglifies JS (`gulp-uglify`)
- Converts LESS to CSS (`gulp-less`)
- Lints CSS (`gulp-recess`)
- Removes Unused CSS (`gulp-uncss`)
- Minifies CSS (`gulp-csso`)
- Watches files and runs tasks on changes + reloads browsers - `gulp watch`. (`gulp-browser-sync`)

### Setup

1. Grab Node if you haven't got it already.
2. Run `npm install -g yo` to install yeoman, grunt and bower. Don't worry if you already have these, they'll be skipped over.
3. Next clone this repo to a new folder somewhere on your machine.
4. Run `npm install` and then run `npm link`.

And you're done, now you can run `yo zentan` in a new folder to start a scaffold of the project.

### Usage

1. Run `yo zentan` in a new folder.
2. Answer the questions yeoman asks you.
3. Next yeoman will set up the project and download dependencies
4. Use `grunt` / `gulp` to build project.
5. `grunt auto` / `gulp watch` will watch files and build on the fly as well as reloading browsers for you

### Troubleshooting

Any other issues feel free to log them in the tracker
