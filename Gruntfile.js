module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        multistr: true,
        force: true,
        ignores: ['dev/lib/*.js']
      },
      default: ['public/**/*.js', 'dev/**/*.js']
    },
    copy: {
      default: {
        files: [
          { src: 'dev/css/style.css', dest: 'public/css/style.css' },
          { src: 'dev/js/vis.js', dest: 'public/js/vis.js' }
        ]
      }, release: {
        files: [
          { src: 'public/**', dest: 'dist/kibana/plugin', expand: true },
          { src: 'index.js', dest: 'dist/kibana/plugin/index.js' },
          { src: 'package.json', dest: 'dist/kibana/plugin/package.json' }
        ]
      }
    },
    replace: {
      default: {
        src: ['public/js/vis.js'], /* Replace module stuff to make it work in kibana */
        overwrite: true,
        replacements: [
          { from: '// import *', to: 'import *'},
          { from: 'pv.vis.template =', to: 'export default' }
        ]
      }, release: { /* Remove '-dev' suffix for a public version */
        src: [
          'dist/kibana/plugin/package.json',
          'dist/kibana/plugin/index.js',
          'dist/kibana/plugin/public/js/controller.js',
          'dist/kibana/plugin/public/js/provider.js'],
        overwrite: true,
        replacements: [
          { from: '-dev', to: ''}
        ]
      }
    },
    compress: {
      release: {
        options: {
          archive: 'dist/releases/plugin.zip'
        },
        files: [
          // { expand: true, cwd: 'dist/kibana', src: ['**'], dest: 'dist/' }
          { src: 'kibana/**', cwd: 'dist', expand: true, dest: '' }
        ]
      }
    }
  });

  // Load the plugins that provide tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default tasks.
  grunt.registerTask('default', ['jshint:default', 'copy:default', 'replace:default']);
  grunt.registerTask('release', ['jshint', 'copy:release', 'replace:release', 'compress:release']);
};