import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[LUMENIQ ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[320px] p-8 text-center
                        bg-slate-900 border border-rose-500/25 rounded-2xl
                        animate-fade-in-up">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/25
                          flex items-center justify-center text-rose-400 mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Something went wrong</h3>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-2">
            An unexpected error occurred rendering this view. Your data is safe.
          </p>
          {this.state.error && (
            <code className="text-[11px] text-rose-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg
                             border border-slate-800 mb-4 max-w-md overflow-x-auto block text-left">
              {this.state.error.message}
            </code>
          )}
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500
                       text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
