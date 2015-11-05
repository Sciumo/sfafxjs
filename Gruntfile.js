module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    peg: {
      sfafx_parser: {
        src: "grammar/sfafx_grammar.peg",
        dest: "grammar/sfafx_parser.js",
        options: { exportVar: "sfafx_parser" }
      }
    },

    concat: {
      options: {
        separator: "\n", //add a new line after each file
        banner: "//SFAFxJS https://github.com/Sciumo/sfafxjs\n\n", //added before everything
        footer: "" //added after everything
      },
      dist: {
        src: [
            //classes and files
            'grammar/sfafx_parser.js',
            'src/**/!(sfafx_base).js',
            //keystone base JS exporting globals
            'src/sfafx_base.js'
        ],
        // final project file
        dest: 'sfafx.js'
      }
    },

    uglify: {
        options: {
          mangle: false
        },
        sfafxmin: {
          files: {
            'sfafx.min.js': ['sfafx.js']
          }
        }
      }

  });

  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('grammar', ['peg:sfafx_parser']);
  grunt.registerTask('dist', ['grammar', 'concat:dist','uglify:sfafxmin']);
};
