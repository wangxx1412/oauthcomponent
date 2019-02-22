const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api/', 
    { target: 'http://localhost:5000' }
    ));
    app.use(proxy('/auth/', 
        { target: 'http://localhost:5000'}
    ));
}
//Note: Due to the default settings of http-proxy-middleware
//the proxy for '/api' should be placed first?
//Otherwise the proxy for '/auth' won't work. 
