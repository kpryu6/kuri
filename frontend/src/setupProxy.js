const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
		['/login', '/pods'],
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      secure:false
    })
  )
}
