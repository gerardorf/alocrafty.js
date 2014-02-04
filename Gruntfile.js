module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'src/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false,
          unescape: false
        }
      },
      files: [ 'Gruntfile.js', 'src/aloCrafty.js' ]
    },

    jasmine: {
      // Your project's source files
      src : 'src/*.js',
      // Your Jasmine spec files
      specs : 'spec/*Spec.js',
      errorReporting: true
    },

    // Project configuration.
    mocha_phantomjs: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/spec/SpecRunner.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    }

  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  // Code analysis
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  // Minize javascript
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  // watch changes
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // This plugin provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Load mocha phantomjs
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  // prepare code task
  grunt.registerTask( 'prepare', [ 'jshint', 'uglify' ] );

  // A convenient task alias.
  grunt.registerTask('test', [ 'prepare', 'connect', 'mocha_phantomjs']);

  // Tests
  grunt.registerTask('default', ['test']);
};