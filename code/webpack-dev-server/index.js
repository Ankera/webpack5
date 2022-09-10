const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../../webpack.config.01');

const compiler = webpack(config);

const app = express();

// app.get('/api/users', (req, res) => {
//   console.log('====')
//   res.json({
//     id: 1,
//     name: "Tom"
//   })
// })

app.use(webpackDevMiddleware(compiler));

app.listen(3005, () => {
  console.log('app successful')
})
