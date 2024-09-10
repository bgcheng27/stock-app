export const HTTP_ERRORS = {
  NOT_FOUND: {
    status: 404,
    message: "Page Not Found"
  },
  SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error"
  }
}


export function formatErrorMessage(message) {
  return `Error: ${message}`
}


export function getPlainErrorMessage(message) {
  const prefix = "Error: ";
  if (message.startsWith(prefix)) {
    return message.slice(prefix.length);
  }
  return message;
}


export function isHttpError(errorText) {
  const status = parseInt(errorText.split(":")[0].trim()); // Extract and parse the status code

  // Check if any of the status codes in HTTP_ERRORS match the extracted status
  return Object.values(HTTP_ERRORS).some(error => error.status === status);
}


export function formatHttpErrorMessage(error) {
  if (error.status && error.message)
    return `${error.status}: ${error.message}`;
  else
    return error
}


export function parseHttpErrorMessage(errorString) {
  const trimmedMsg = getPlainErrorMessage(errorString)

  if (!trimmedMsg.includes(": ")) {
    return trimmedMsg;
  }

  const status = parseInt(trimmedMsg.split(": ")[0].trim(), 10)
  const message = trimmedMsg.split(": ")[1]

  return { status, message }
}


export function hasUndefinedProperty(obj) {
  // Get an array of all properties of the object except 'error'
  const propertiesToCheck = Object.keys(obj).filter(key => key !== 'error');
  
  // Check if any of the properties are undefined
  return propertiesToCheck.some(key => obj[key] === undefined);
}


export function handleErrors(apiData) {
  const {
    symbol,
    error,
  } = apiData

  if (symbol === undefined) {
    throw new Error(formatHttpErrorMessage(HTTP_ERRORS.NOT_FOUND))
  } else if (hasUndefinedProperty(apiData)) {
    throw new Error(formatHttpErrorMessage(HTTP_ERRORS.SERVER_ERROR))
  } else if (error) {
    throw new Error(error)
  }
}
