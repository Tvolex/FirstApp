'use strict';

module.exports = {
    context: __dirname + '/js',
    entry: __dirname + '/js/app',
    output: {
        filename: "/build.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    }
}; 