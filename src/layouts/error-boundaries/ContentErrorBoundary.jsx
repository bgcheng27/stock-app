import React from "react";
import { ErrorPage } from "../../pages/ErrorPage";

export class ContentErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error, errorInfo) {
    return { hasError: true, }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo 
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children;
  }
}