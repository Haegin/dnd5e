module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/styles.css' : 'css/styles.scss'
        }
      }
    },
    browserify: {
      app: {
        files: {
          'bundle.js': ['js/components/Character.jsx']
        },
        options: {
          transform: ['reactify'],
          watch: true
        }
      },
      test: {
        files: {
          'test/specs.js': ['test/specs/**/*.js']
        },
        options: {
          watch: true
        }
      }
    },
    jasmine: {
      dev: {
        options: {
          specs: 'test/specs.js'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '127.0.0.1'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default',['connect', 'browserify', 'watch']);
}
