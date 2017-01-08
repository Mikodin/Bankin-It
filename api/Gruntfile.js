module.exports = function(grunt) {
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
      all: ['Gruntfile.js','test/*.js', 'src/*.js', 'src/*/*.js'],
      options: {
        esversion: 6
      }
    },
    jscs: {
      src: ['Gruntfile.js','test/*.js', 'src/*.js', 'src/*/*.js'],
      options: {
        preset: 'google'
      }
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
    env: {
      options: {
      },
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['jshint', 'jscs', 'mochaTest']);
  grunt.registerTask('test', ['env:test', 'mochaTest']);
  grunt.registerTask('watch-test', ['env:test', 'watch']);

};
