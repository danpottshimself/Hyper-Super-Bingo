(function () {
    'use strict';
    module.exports={
                mainappimages: {
                    cwd: '',
                    src: ['app/images/**/*.*'],
                    dest: '.build/',
                    expand: true
                },
                mainappsounds: {
                    cwd: '',
                    src: ['app/sounds/*.*'],
                    dest: '.build/',
                    expand: true
                },
                html: {
                    cwd: '',
                    src: ['app/html/*.*', 'app/partials/*.html', 'app/*.html'],
                    dest: '.build/',
                    expand: true
                },
                bower: {
                    cwd: '',
                    src: ['bower_components/**/*.*'],
                    dest: '.build/app/thirdparty/',
                    expand: true
                },
                animation: {
                    cwd: '',
                    src: ['app/animation/animate.css'],
                    dest: '.build/app/css/animate.css',
                    expand:false
                }
            };
})();