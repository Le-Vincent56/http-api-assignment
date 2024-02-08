// Helper functions
const createXMLResponse = (message, id) => {
  // Create the XML response
  let responseXML = '<response>';
  responseXML += `<message>${message}</message>`;
  responseXML += `<id>${id}</id>`;
  responseXML += '</response>';

  // Return the XML response
  return responseXML;
};

const respond = (request, response, status, type, data) => {
  // Write header
  response.writeHead(status, { 'Content-Type': type });

  // Write the response
  response.write(data);

  // End the response
  return response.end();
};

// Server functions

const success = (request, response, acceptedTypes) => {
  // Create the response
  const serverResponse = {
    message: 'This is a successful response',
    id: 'success',
  };

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  // Respond with a success code in JSON format
  return respond(request, response, 200, 'application/json', JSON.stringify(serverResponse));
};

const badRequest = (request, response, acceptedTypes, params) => {
  // Create the response
  const serverResponse = {
    message: 'This request has the required parameters',
  };

  // Check if the request contains a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // Correct the error message
    serverResponse.message = 'Missing query parameter: ?valid=true';

    // Give the error a consistent id
    serverResponse.id = 'badRequest';

    // Check if the preferred type is xml, and respond accordingly
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
      return respond(request, response, 400, 'text/xml', responseXML);
    }

    // Return with a bad request status code
    return respond(request, response, 400, 'application/json', JSON.stringify(serverResponse));
  }

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  // If user has the valid=true query parameter, send with a success status code
  return respond(request, response, 200, 'application/json', JSON.stringify(serverResponse));
};

const unauthorizedRequest = (request, response, acceptedTypes, params) => {
  // Create the response
  const serverResponse = {
    message: 'User is authenticated',
  };

  // Check if the request contains a loggedIn=yes query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // Correct the error message
    serverResponse.message = 'Missing query parameter: ?loggedIn=yes';

    // Give the error a consistent id
    serverResponse.id = 'unauthorized';

    // Check if the preferred type is xml, and respond accordingly
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
      return respond(request, response, 401, 'text/xml', responseXML);
    }

    // Return with 401
    return respond(request, response, 401, 'application/json', JSON.stringify(serverResponse));
  }

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  // If user has the loggedIn=yes parameter, send with a success status code
  return respond(request, response, 200, 'application/json', JSON.stringify(serverResponse));
};

const forbidden = (request, response, acceptedTypes) => {
  // Create the response
  const serverResponse = {
    message: 'User is forbidden',
    id: 'forbidden',
  };

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 403, 'text/xml', responseXML);
  }

  // If the user is forbidden, send the appropriate status code
  return respond(request, response, 403, 'application/json', JSON.stringify(serverResponse));
};

const internal = (request, response, acceptedTypes) => {
  // Create the response
  const serverResponse = {
    message: 'Internal server error',
    id: 'internalError',
  };

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 500, 'text/xml', responseXML);
  }

  // If there's an internal server error, send the appropriate status code
  return respond(request, response, 500, 'application/json', JSON.stringify(serverResponse));
};

const notImplemented = (request, response, acceptedTypes) => {
  // Create the response
  const serverResponse = {
    message: 'Page/Request not implemented',
    id: 'notImplemented',
  };

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 501, 'text/xml', responseXML);
  }

  // If the page/request is not implemented, send the appropriate status code
  return respond(request, response, 501, 'application/json', JSON.stringify(serverResponse));
};

const notFound = (request, response, acceptedTypes) => {
  // Create the response
  const serverResponse = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // Check if the preferred type is xml, and respond accordingly
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = createXMLResponse(serverResponse.message, serverResponse.id);
    return respond(request, response, 404, 'text/xml', responseXML);
  }

  // Respond with a 404
  return respond(request, response, 404, 'application/json', JSON.stringify(serverResponse));
};

// Exports
module.exports = {
  success,
  badRequest,
  unauthorizedRequest,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
