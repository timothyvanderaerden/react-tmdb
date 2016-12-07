const webpack = require("webpack");

module.exports = {
    entry: {
        javascript: './entry.js',
        html: './index.html'
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2016']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
