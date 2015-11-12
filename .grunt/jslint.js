(function () {
    'use strict';
    module.exports = {
        jshint: {
            all: ['app/scripts/**/*.js', './.grunt/**/*.js'],
            cwd: '',
            src: ['app/scripts/**/*.js', './.grunt/**/*.js'],
            dest: '.build/app/Scripts/',
            expand: true
        }
    };
})();
