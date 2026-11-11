/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in its child component tree,
 * logs the error, and displays a friendly, warm culinary fallback UI.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Culinary Echo caught an error in component tree:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[360px] p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-stone-200/90 shadow-xs max-w-2xl mx-auto my-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-amber-800" />
          </div>

          <h3 className="text-xl font-serif font-bold text-stone-900">
            {this.props.fallbackTitle || 'A flavor note got slightly mixed up'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md leading-relaxed">
            We ran into an unexpected hiccup while preparing this view. Your saved recipes, pantry notes, and taste explorations remain safe.
          </p>

          {this.state.error && (
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] font-mono text-stone-500 max-w-md overflow-x-auto text-left">
              {this.state.error.message}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-stone-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => {
                this.handleReset();
                window.location.reload();
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
