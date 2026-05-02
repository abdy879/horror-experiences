import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-horror-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-20 h-20 text-horror-red mx-auto mb-6" />
            
            <h1 className="font-horror text-3xl text-horror-red text-glow mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-horror-muted mb-8 font-body">
              The spirits have disturbed the realm. An unexpected error has occurred.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRefresh}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-horror-darker hover:bg-horror-dark text-gray-300 rounded transition-colors horror-card"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-horror-red hover:bg-horror-blood text-white rounded transition-colors horror-card"
              >
                <Home className="w-5 h-5" />
                <span>Return Home</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-horror-darker rounded text-left overflow-auto max-h-64">
                <p className="text-horror-red font-mono text-sm mb-2">Error details (development only):</p>
                <pre className="text-gray-400 font-mono text-xs whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
