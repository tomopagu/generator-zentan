'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Ah4Generator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Ah4 generator.'));

    var prompts = [{
      name: 'siteName',
      message: 'What is this site called?',
    }, {
      type: 'confirm',
      name: 'useGrunt',
      message: 'Would you like to use Grunt(Y) or Gulp(n)?'
    }];


    this.prompt(prompts, function (props) {
      this.siteName = props.siteName;
      this.useGrunt = props.useGrunt;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/js');
    this.mkdir('src/less');

    this.template('_config.json', 'config.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  runtime: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('bootstrap-ie7.css', 'src/compiled/css/bootstrap-ie7.css');
    this.copy('boxsizing.htc', 'src/compiled/js/boxsizing.htc');
    this.copy('site.less', 'src/less/site.less');
    this.copy('site.js', 'src/js/site.js');
  },

  useGrunt: function () {
    if (this.useGrunt) {
      this.copy('grunt/Gruntfile.coffee', 'Gruntfile.coffee');

      this.template('grunt/_bower.json', 'bower.json');
      this.template('grunt/_package.json', 'package.json');

      this.template('grunt/_readme.md', 'readme.md');

      this.template('grunt/index.html', 'src/index.html');
    }
    else {
      this.copy('gulp/gulpfile.js', 'gulpfile.js');

      this.template('gulp/_bower.json', 'bower.json');
      this.template('gulp/_package.json', 'package.json');

      this.template('gulp/_readme.md', 'readme.md');

      this.template('gulp/index.html', 'src/index.html');
    }
  }

});

module.exports = Ah4Generator;
