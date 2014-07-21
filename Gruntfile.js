module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '_source/css/app.css': '_source/_scss/app.scss'
        }        
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      js_frontend: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'bower_components/modernizr/modernizr.js',
          '_source/_js/*'
        ],
        dest: '_source/js/app.js',
      }
    },

    jshint: {
      src: ['_source/_js/*'],
    },

    scsslint: {
      allFiles: [
        '_source/_scss/*.scss',
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      }
    },

    jekyll: {
      serve: {
        options: {
          serve: true
        } 
      }
    },


    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: '_source/_scss/**/*.scss',
        tasks: [ 'buildcss']
      },

      js_frontend: {
        files: [
          '_source/_js/*'
        ],   
        tasks: ['buildjs']
      }
    }


  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('buildcss', ['scsslint','sass']);
  grunt.registerTask('buildjs', ['jshint','concat']);
  grunt.registerTask('default', ['buildcss', 'buildjs', 'jekyll']);
}
