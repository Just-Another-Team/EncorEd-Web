const path = require("path");
module.exports = {
    entry: "./src/index.js", // Entry point of your application
    output: {
        filename: "bundle.js", // Output bundle file name
        path: path.resolve(__dirname, "dist"), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                loader: ["style-loader", "css-loader"],
                options: {
                  url: true,
                },
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        contentBase: path.join(__dirname, "public"), // Serve files from this directory
        port: 3000, // Port for the development server
        open: true, // Open the default web browser when the server starts
    },
};