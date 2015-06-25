module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'lib/emoji.js',
        dest: 'lib/emoji.min.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['uglify']);
  
};
