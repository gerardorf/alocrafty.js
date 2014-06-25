module.exports = function(grunt) {

  grunt.initConfig({

    bower: grunt.file.readJSON('bower.json'),

    uglify: {
      options: {
        banner: '/*! aloCrafty.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'dist/alocrafty-<%= bower.version %>.min.js'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['src/*.js']
    },

    jasmine: {
      test: {
        src: 'src/*.js',
        options: {
          specs: [
            'spec/*Spec.js'
          ],
        }
      },

      istanbul: {
        src: '<%= jasmine.test.src %>',
        options: {
          specs: '<%= jasmine.test.options.specs %>',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/json/coverage.json',
            report: [{
              type: 'text-summary'
            }, {
              type: 'lcov',
              options: {
                dir: 'coverage/lcov'
              }
            }]
          }
        }
      }
    },

    jscpd: {
      javascript: {
        path: 'src/'
      }
    },

    complexity: {
      generic: {
        src: 'src/*.js',
        options: {
          breakOnErrors: false,
          errorsOnly: false,
          cyclomatic: [3, 7, 12],
          halstead: [8, 13, 20],
          maintainability: 100,
          hideComplexFunctions: false
        }
      }
    }

  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });

  grunt.registerTask('build', ['test', 'uglify']);
  grunt.registerTask('test', ['jasmine:test']);
  grunt.registerTask('metrics', ['jshint', 'jasmine:istanbul', 'jscpd', 'complexity']);
  grunt.registerTask('default', ['test']);
};
