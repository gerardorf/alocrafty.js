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
    }

  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['test', 'jshint', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine:test']);
  grunt.registerTask('metrics', ['jshint', 'jasmine:istanbul', 'jscpd']);
  grunt.registerTask('default', ['test']);
};
