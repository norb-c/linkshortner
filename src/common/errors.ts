export enum Errors {
  SERVER_ERROR = 'Internal server error. It would be nice if you report this to us',
  NOT_AUTHENTICATED = 'This request is not authenticated',
  NOT_AUTHORIZED = 'Request is not authorized',
  BAD_REQUEST = 'Invalid request data',
  CONFLICT = 'The request could not be completed due to a conflict with the current state of the target resource',
  NOT_IMPLEMENTED = 'Functionality not supported',
  VALIDATION = 'Invalid data provided for this request',
  RESOURCE_NOT_FOUND = 'Resource not found',
  SERVICE_UNAVAILABLE = 'Service currently unavailable',
  INVALID_AUTHORIZATION_TOKEN = 'Authorization token is invalid'
}
