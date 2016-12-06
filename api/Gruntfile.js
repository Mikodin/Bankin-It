module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    },
    jshint: {
      all: ['Gruntfile.js','test/*.js', 'src/*.js', 'src/*/*.js']
    },
    jscs: {
      src: ['Gruntfile.js','test/*.js', 'src/*.js', 'src/*/*.js'],
    },
    watch: {
      scripts: {
        files: ['test/*.js', 'src/*.js', 'src/*/*.js'],
        tasks: ['default'],
        options: {
          spawn: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['mochaTest', 'jshint', 'jscs']);

};
