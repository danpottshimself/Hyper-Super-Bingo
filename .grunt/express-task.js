(function () {
    'use strict';
    var express = require('express');
    var app = express();

    app.use(express.static(process.cwd() + '/.build/app', {maxAge:86400000}));
    module.exports = app;
}());
