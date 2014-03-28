module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    # The package meta data.
    pkg: grunt.file.readJSON('package.json')

    # Watch files for changes.
    watch:
      gruntfile:
        files: [ 'Gruntfile.coffee' ]
        tasks: [ 'default' ]
      config:
        files: [ 'package.json' ]
        tasks: [ 'jshint' ]
      css:
        files: [ 'src/less/**' ]
        tasks: [ 'css', 'html' ]
        options:
          interrupt: true
      js:
        files: [ 'src/js/**' ]
        tasks: [ 'js', 'html' ]
        options:
          interrupt: true
      pages:
        files: [ 'src/*.html', 'src/*.php' ]
        tasks: [ 'html' ]
        options:
          interrupt: true
      img:
        files: [ 'src/img/**' ]
        tasks: [ 'img' ]

    # Livereload and Sync Actions accross browsers
    browserSync:
      dev:
        bsFiles:
          src : [
            'assets/css/*.css',
            'assets/img/**/*.jpg',
            'assets/img/**/*.png',
            'assets/js/**/*.js',
            '**/*.html'
          ]
        options:
          watchTask: true
          host : "localhost"

    # Check json/js files for code errors.
    jshint:
      options:
        curly: true
        smarttabs: true
      all: [ 'src/js/**/*.js' ]

    # Check coffee files for code errors.
    coffeelint:
      options:
        'no_tabs':
          level: 'ignore'
        'indentation':
          level: 'ignore'
      all: [ 'src/coffee/**/*.coffee' ]

    # Clean some directories.
    clean:
      assets: [ 'assets' ]
      imgs: [ 'assets/img' ]
      dist: [ 'dist' ]

    # Copy Files/Folders
    copy:
      assets:
        files: [
          {
            expand: true
            cwd: 'src/'
            src: [
              'img/**'
            ]
            dest: 'assets'
          }
        ]
      bootstrap:
        files: [
          {
            expand: true
            cwd: 'src/vendor/bootstrap'
            src: [
              'fonts/**'
            ]
            dest: 'assets'
          },
          {
            expand: true
            cwd: 'src/vendor/bootstrap/assets/js'
            src: [
              'html5shiv.js',
              'respond.min.js'
            ]
            dest: 'assets/js'
          }
        ]
      ie7:
        files: [
          {
            expand: true
            cwd: 'src/compiled/'
            src: [
              'css/bootstrap-ie7.css',
              'js/boxsizing.htc'
            ]
            dest: 'assets'
          }
        ]
      dist:
        files: [
          {
            expand: true
            cwd: ''
            src: [
              'assets',
              '*.html'
            ]
            dest: 'dist'
          }
        ]

    # Compile LESS files.
    recess:
      options:
        compile: true
      bootstrap:
        src: [
          'src/vendor/bootstrap/less/bootstrap.less'
        ]
        dest: 'src/compiled/css/bootstrap.css'
      site:
        src: [
          'src/less/site.less'
        ]
        dest: 'src/compiled/css/site.css'

    # Concat files together.
    concat:
      bootstrapJs:
        src: [
          'src/vendor/bootstrap/js/transition.js'
          'src/vendor/bootstrap/js/alert.js'
          'src/vendor/bootstrap/js/button.js'
          'src/vendor/bootstrap/js/carousel.js'
          'src/vendor/bootstrap/js/collapse.js'
          'src/vendor/bootstrap/js/dropdown.js'
          'src/vendor/bootstrap/js/modal.js'
          'src/vendor/bootstrap/js/tooltip.js'
          'src/vendor/bootstrap/js/popover.js'
          'src/vendor/bootstrap/js/scrollspy.js'
          'src/vendor/bootstrap/js/tab.js'
          'src/vendor/bootstrap/js/affix.js'
        ],
        dest: 'src/compiled/js/bootstrap.js'
      siteCss:
        src: [
          '<%= recess.bootstrap.dest %>'
          '<%= recess.site.dest %>'
        ]
        dest: 'src/compiled/css/combined.css'
      siteJs:
        src: [
          'src/vendor/jquery/jquery.js'
          '<%= concat.bootstrapJs.dest %>'
          'src/js/site.js'
        ]
        dest: 'assets/js/combined.js'

    # Removes unused CSS
    uncss:
      dist:
        files:
          'assets/css/tidy-combined.css': ['src/*.html']
        options:
          compress: true

    # Processes the HTML for any changes (Goes with UnCSS)
    processhtml:
      dist:
        options:
          process: true
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.html'],
            dest: './',
            ext: '.html'
          }
        ]

    # Minify JS
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        compress: true
      siteJs:
        src: [
          '<%= concat.siteJs.dest %>'
        ]
        dest: '<%= concat.siteJs.dest %>'

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-recess'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-uncss'
  grunt.loadNpmTasks 'grunt-processhtml'

  # Default tasks.
  grunt.registerTask 'default', ['jshint', 'coffeelint', 'clean:assets', 'clean:dist', 'copy:assets', 'copy:bootstrap', 'copy:ie7', 'recess', 'concat', 'uncss', 'processhtml']# 'uglify' ]

  grunt.registerTask 'css', ['recess', 'concat:siteCss']
  grunt.registerTask 'js', ['jshint', 'coffeelint', 'concat:bootstrapJs', 'concat:siteJs', 'uglify']
  grunt.registerTask 'html', ['uncss', 'processhtml']
  grunt.registerTask 'img', ['clean:imgs', 'copy:assets']
