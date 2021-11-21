const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');

app.listen(port || 5000, '0.0.0.0', () =>
  logger.info(`server listening on port ${port || 5000} (${env})`)
);

/**
 *
 * Exports express
 * @public
 */
module.exports = app;
