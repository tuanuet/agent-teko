
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var open = require('open');
const webpackConfig = require('../../webpack.config');
let compiler = webpack(webpackConfig);
let app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, publicPath: webpackConfig.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.join(__dirname, '../../static')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../static/index.html'));
});

app.listen(9005, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://localhost:9005/');
    open(`http://localhost:9005`);
});
