const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../src/routes/v1');
const { logs } = require('./vars');
const error = require('../src/middlewares/error');

/**
 *
 * Express instance
 * @public
 */
const app = express();

app.use(morgan(logs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(methodOverride());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
      },
    },
  })
);
app.use(cors());
app.use(express.static(`${path.normalize(`${__dirname}/..`)}/public`));

app.use('/api/v1', routes);

app.use(error.converter);

app.use(error.notFound);

app.use(error.handler);

module.exports = app;
