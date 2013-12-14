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
      files: [ 'Gruntfile.js', 'src/aloCrafty.js', 'spec/aloCraftySpec.js' ]
    },

    jasmine: {
      all: ['specs/SpecRunner.html'],
      errorReporting: true
    },

    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    }

  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  // Jasmine tasks.
  grunt.loadNpmTasks('grunt-jasmine-html-spec-runner');

  // Default task
  grunt.registerTask( 'test', [ 'jshint', 'uglify', 'jasmine' ] );

  // Tests
  grunt.registerTask('default', ['test']);
};