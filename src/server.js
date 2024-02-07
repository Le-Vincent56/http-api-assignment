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
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,

  notFound: jsonHandler.notFound,
};

// Server functions
const onRequest = (request, response) => {
  // Parse the URL and queries
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
