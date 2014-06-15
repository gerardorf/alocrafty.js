module.exports = function(grunt) {

  grunt.initConfig({

    bower: grunt.file.readJSON('bower.json'),

    uglify: {
      options: {
        banner: '/*! aloCrafty.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/alocrafty.js',
        dest: 'dist/alocrafty-<%= bower.version %>.min.js'
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
      files: ['src/alocrafty.js']
    },

    jasmine: {
      test: {
        src:'src/*.js', 
        options: {
          specs: [
            'spec/*Spec.js'
          ],
        }
      }
    }
  });

  // Load grunt tasks automatically
  require( 'load-grunt-tasks' )( grunt );

  grunt.registerTask('build', [ 'test', 'jshint', 'uglify' ] );
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['test']);
};
