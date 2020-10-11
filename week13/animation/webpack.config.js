
module.exports = {
    entry: {
        main: './main.js',
        animation: './animation-demo.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                    }
                }
            }
        ]
    },
    // output: {
    //     filename: '[name].js',
    //     path: __dirname + '/dist'
    // },
    mode: "development"
}