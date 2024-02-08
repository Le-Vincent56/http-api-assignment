// Imports
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const responseHandler = require('./responses.js');

// Establish port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndexPage,
  '/style.css': cssHandler.getIndexStyle,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorizedRequest,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

// Server functions
const onRequest = (request, response) => {
  // Parse the URL and queries
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  // Get accepted header types
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
