(function () {
    'use strict';
    module.exports = {
        lesslint: {
            cwd: 'app/main-less',
            src: ['**/*.less'],
            dest: '.build/app/css/',
            expand: true,
            ext: '.css'
        }
    };
    })();
