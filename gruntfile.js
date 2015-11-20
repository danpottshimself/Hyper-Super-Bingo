(function () {
    'use strict';
    var copyTask = require ('./.grunt/copy-task'),
        lessTask = require('./.grunt/less-task'),
        JSHintTask=require('./.grunt/jslint'),
        concatTask=require('./.grunt/concat-task'),
        karmaTask = require ('./.grunt/karma-task'),
        cleanTask=require('./.grunt/clean-task'),
        watchTask=require('./.grunt/watch-task');
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            copy:copyTask,
            lesslint: lessTask,
            less:lessTask,
            jshint:JSHintTask,
            concat:concatTask,
            karma:karmaTask,
            watch:watchTask,
            clean:cleanTask
        });
        grunt.loadNpmTasks('grunt-lesslint');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-karma');

        grunt.registerTask('lessFiles', ['lesslint', 'clean:less','less']);
        grunt.registerTask('jsFiles', ['jshint','clean:javascript', 'concat']);
        grunt.registerTask('htmlFiles', ['clean:html', 'copy:html']);
        grunt.registerTask('build', ['clean:images', 'copy', 'lessFiles', 'jsFiles']);
        grunt.registerTask('notest', ['build','server', 'watch']);
        grunt.registerTask('default', ['build','karma', 'server', 'watch']);
        var port = 35002;
        grunt.registerTask('server', 'Start a custom web server', function() {
            var server = require('./.grunt/express-task.js');
            server.listen(port);
            grunt.log.writeln('Listening on port ' + port);
        });
    };
})();
