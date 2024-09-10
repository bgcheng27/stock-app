import React from "react";
import { ProdErrorPage } from "../../pages/ProdErrorPage"
import { HTTP_ERRORS, getPlainErrorMessage, isHttpError, parseHttpErrorMessage } from "../../js/errorHandler";

export class ContentErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null, message: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    const message = error.toString()

    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
      message
    })
  }

  render() {
    if (this.state.hasError) {
      const errorText = getPlainErrorMessage(this.state.error.toString())
      console.log(errorText)


      if (isHttpError(errorText)) {
        const { status, message } = parseHttpErrorMessage(errorText);

        return <ProdErrorPage statusCode={status} message={message} />
      }
      

      return <ProdErrorPage statusCode={HTTP_ERRORS.SERVER_ERROR.status} message={HTTP_ERRORS.SERVER_ERROR.message} />
    }

    return this.props.children;
  }
}