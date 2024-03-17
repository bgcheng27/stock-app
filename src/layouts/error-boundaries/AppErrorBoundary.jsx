import React from "react";

export class AppErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error, errorInfo) {
    console.log(errorInfo)
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
      console.log("F")
      return <h1>Singed</h1>
    }

    return this.props.children;
  }
}