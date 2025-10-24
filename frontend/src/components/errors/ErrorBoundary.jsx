// src/pages/ErrorBoundary.jsx
import React from 'react';
import CodeTerminalFullScreen from './CodeTerminal';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <CodeTerminalFullScreen />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;