module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build'],
      css: ['source/css/*'],
      js: ['source/js/*']
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'source/css/app.css': 'source/_scss/app.scss'
        }        
      },
      
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'source/css/app.css': 'source/_scss/app.scss'
        }        
      }
    },
    
    concat: {
      dev: {
        options: {
          separator: ';\n',
        },
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'bower_components/modernizr/modernizr.js',
          'source/_js/*'
        ],
        dest: 'source/js/app.js',
      },

      prod: {
        options: {
          seperator: ';',
          stripBanners: true
        },
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'bower_components/modernizr/modernizr.js',
          'source/_js/*'
        ],
        dest: 'source/js/app.js',
      }


    },

    jshint: {
      src: ['source/_js/*'],
    },

    scsslint: {
      allFiles: [
        'source/_scss/*.scss',
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      }
    },

    jekyll: {
      dev: {
        options: {
          dest: 'build/dev'
        }        
      },
      
      prod: {
        options: {
          dest: 'build/prod'
        }
      },

      serve: {
        options: {
          serve: true
        } 
      }
    },


    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'source/_scss/**/*.scss',
        tasks: [ 'buildcss']
      },

      js_frontend: {
        files: [
          'source/_js/*'
        ],   
        tasks: ['buildjs']
      }
    }


  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');

  var env = grunt.option('environment') || 'dev';

  grunt.registerTask('buildcss', ['scsslint','sass:' + env]);
  grunt.registerTask('buildjs', ['jshint','concat:' + env]);
  grunt.registerTask('build', ['clean','buildcss', 'buildjs', 'jekyll:' + env ]);
  grunt.registerTask('default', ['clean','buildcss', 'buildjs', 'jekyll:serve']);

}
