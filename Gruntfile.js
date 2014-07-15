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


    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },

      js_frontend: {
        files: [
          '_source/_js/*'
        ],   
        tasks: ['concat:js_frontend'],  
        options: {
          livereload: true              
        }
      }

    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','concat','watch']);
}
