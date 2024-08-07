export default () => ({
  debug: process.env.DEBUG,
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  routePrefix: process.env.ROUTE_PREFIX,
});
