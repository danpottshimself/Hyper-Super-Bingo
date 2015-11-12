(function () {
    'use strict';
    module.exports={
        concat: {
            cwd: '',
            src: ['app/scripts/modules.js', 'app/scripts/proxy/**/*.js', 'app/scripts/ticket/**/*.js', 'app/scripts/template-cache.js'],
            dest: '.build/app/scripts/app.js',
            expand: false,
            nonull: true,
            ext: '.min.js'
        }
    };
})();