

module.exports = function(grunt) {

  var env = grunt.option('environment') || process.env.ENVIRONMENT || 'dev';

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

    jshint: {
      src: ['source/_js/*'],
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'source/js/app.js': 
          [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/foundation/js/foundation.min.js',
            'bower_components/modernizr/modernizr.js',
            'source/_js/*'
          ]
        }
      },
      prod: {
        options: {
          compress: true,
          preserveComments: false
        },
        files: {
          'source/js/app.js': 
          [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/foundation/js/foundation.min.js',
            'bower_components/modernizr/modernizr.js',
            'source/_js/*'
          ]
        }
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
      }
    },

    shell: {                              
        start: {                      
            options: {                
                stderr: true
            },
            command: 'scripts/start-server.sh ' + env
        }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'source/_scss/**/*.scss',
        tasks: [ 'buildcss']
      },
      js: {
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('buildcss', ['scsslint','sass:' + env]);
  grunt.registerTask('buildjs', ['jshint','uglify:' + env]);
  grunt.registerTask('start',['shell:start']);

  grunt.registerTask('build', ['clean','buildcss', 'buildjs', 'jekyll:' + env ]);
  grunt.registerTask('default', ['build', 'start']);
}
