import React from "react";
import { ErrorPage } from "../../pages/ErrorPage";

export class AppErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error, errorInfo) {
    // console.log(this.state.message);
    console.log(errorInfo)
    return { hasError: true, }
  }

  componentDidCatch(error, errorInfo) {

    // console.log("Error: ", error.message)

    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo 
    })
  }

  render() {
    if (this.state.hasError) {
      // console.log(this.state.message)
    //   return <ErrorPage error={this.state.error} errorInfo={this.state.errorInfo}/>
      console.log("F")
      return <h1>Singed</h1>
    }

    return this.props.children;
  }
}