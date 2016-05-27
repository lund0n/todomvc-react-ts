'use strict';
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base');

const webpackDevConfig = Object.assign({}, webpackBaseConfig);

webpackDevConfig.devTool = 'inline-source-map';
webpackDevConfig.module.loaders = webpackBaseConfig.module.loaders.map(loader => {
    if (loader.loaders &&
        (loader.loaders.indexOf('css') >= 0 ||
            loader.loaders.indexOf('style') >= 0)) {
        return Object.assign({}, loader, {
            loaders: ['null']
        });
    } else {
        return loader;
    }
});
webpackDevConfig.tslint = {
    emitErrors: true,
    failOnHint: false,
};
webpackDevConfig.plugins = [];
module.exports = webpackDevConfig;
