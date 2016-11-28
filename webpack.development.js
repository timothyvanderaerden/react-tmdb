module.exports = {
    entry: './entry',
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
            }
        ]
    },
    resolve: {
        extensions:[
            '',
            '.js',
            '.jsx'
        ]
    }
};
