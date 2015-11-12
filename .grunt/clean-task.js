(function () {
    'use strict';
    module.exports = {
    less:{
        src: [".build/app/main-less/*.*"]
    },
    javascript:{
            src: [".build/app/scripts/**/*.*"]
        },
        html:{
            src: [".build/app/html/*.html"]
        },
        images: {
            src: [".build/app/images/*.*"]
        }
    };
})();