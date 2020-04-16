import React, { Component } from "react";
/*
This component detects any errors,
then outputs an error message if an error is detected
*/
class ErrorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h1>There was an error.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorComponent;
