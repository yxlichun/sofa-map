const path = require('path');

module.exports = {
  entry: {
    map: path.resolve(__dirname, '../components/Map/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'sofa-map.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
