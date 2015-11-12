(function () {
    'use strict';
    module.exports = {
            less: {
                files: ['app/main-less/*.less'],
                tasks: ['lessFiles']
        },
            javascriptWatcher: {
                files: ['app/scripts/**/*.js'],
                tasks: ['jsFiles']

        },
            htmlWatcher: {
                files: ['app/html/*.html', 'app/partials/*.html'],
                tasks: ['htmlFiles']
            },
        karma:{
            files:'.unit-test/**/*.js',
            tasks:['karma:unit:run']
        }

    };
})();