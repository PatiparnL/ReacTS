const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/node/", {
      target: process.env.REACT_APP_ROUTE_API_ENDPOINT_NODESERVICE,
      pathRewrite: { "^/node": "" },
      changeOrigin: true,
    }),
    createProxyMiddleware("/api/", {
      target: process.env.REACT_APP_API_BASE_URL,
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    }),
  );
}