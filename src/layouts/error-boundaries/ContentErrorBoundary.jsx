import React from "react";
import { ErrorPage } from "../../pages/ErrorPage";
import { NotFound } from "../../pages/NotFound"
import { HttpError } from "../../errors/HttpError";
import { ERROR_MESSAGES } from "../../js/mockData";

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
      
      if (this.state.message === ERROR_MESSAGES.UNDEFINED_SYMBOL) {
        return <NotFound />
      }

      return <ErrorPage error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children;
  }
}