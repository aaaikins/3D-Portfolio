import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold mb-4 text-white">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-400 mb-6">
              We encountered an unexpected error. Don't worry, it's not your fault!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-royal to-lavender text-white rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Refresh page"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-neutral-500 cursor-pointer">
                  Technical Details (Development)
                </summary>
                <pre className="text-xs text-red-400 mt-2 overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
