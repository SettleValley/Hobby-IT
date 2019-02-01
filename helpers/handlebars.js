'use strict';
var htmlMinify = require('html-minifier').minify;

function minify(content){
    return htmlMinify(content.fn(this),{
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
    });
}

module.exports = {
    minify: minify,
};
