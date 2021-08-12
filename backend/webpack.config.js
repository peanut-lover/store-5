const path = require('path');

module.exports = {
  entry: './src/server.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [
    'react-native-sqlite-storage',
    'mssql',
    'sql.js',
    'sqlite3',
    'better-sqlite3',
    'ioredis',
    'redis',
    'typeorm-aurora-data-api-driver',
    'pg-query-stream',
    'pg-native',
    'pg',
    'oracledb',
    'mysql',
    'hdb-pool',
    'cardinal',
    'react-native-sqlite-storage',
    'mongodb',
    'sap/hana-client',
  ],
};
