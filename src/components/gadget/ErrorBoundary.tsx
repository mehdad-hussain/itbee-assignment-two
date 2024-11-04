import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React from "react";

interface ErrorBoundaryProps {
    error?: Error;
    resetErrorBoundary?: () => void;
}

export default class ErrorBoundary extends React.Component<
    React.PropsWithChildren<ErrorBoundaryProps>,
    { hasError: boolean; error: Error | null; errorInfo: string | null }
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        // Extract the first line of the stack trace
        const firstStackLine = errorInfo.componentStack
            ? errorInfo.componentStack.split("\n")[1].trim()
            : "No component stack trace available";

        this.setState({ hasError: true, error, errorInfo: firstStackLine });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        this.props.resetErrorBoundary?.();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <Alert variant="destructive" className="w-full max-w-md">
                        <AlertTitle className="text-xl font-bold">Something went wrong</AlertTitle>
                        <AlertDescription className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <p className="font-semibold">{this.state.error?.message || "An unexpected error occurred."}</p>
                            {this.state.errorInfo && (
                                <pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap dark:text-gray-400">
                                    {this.state.errorInfo}
                                </pre>
                            )}
                        </AlertDescription>
                    </Alert>

                    <Button onClick={this.handleReset} variant="outline" className="w-32 mt-6 text-sm font-medium">
                        Try Again
                    </Button>
                </div>
            );
        }
        return this.props.children;
    }
}
