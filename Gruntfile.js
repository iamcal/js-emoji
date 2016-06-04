module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        ASCIIOnly: true
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
      },
      coverage: {
        configFile: 'karma-cover.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'OFF'
      },
    },
    coveralls: {
      options: {
        debug: true,
        coverageDir: 'coverage/',
        dryRun: false,
        force: true,
        recursive: true
      }
    },
    shell: {
      compile: {
        command: 'php build/build.php > lib/emoji.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell:compile', 'uglify', 'karma:unit', 'karma:coverage']);
  
};
