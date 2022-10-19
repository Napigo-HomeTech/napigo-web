import React, { Component, ErrorInfo, Fragment, ReactElement } from "react";

type ErrorBoundaryProps = {
    /**
     * @component The React Component which you want to catch
     * any errors occurs within it.
     */
    children?: React.ReactNode;
    /**
     * If an error occurs or threw, this function will call and
     * render on screen. @NOTE - The returning component can be a full page
     * or a dialog component which display as floating dialog, but SHOULD NOT be a part of
     * a route to specific page, eg: Redirect to 404 page
     */
    renderFallbackComponent?: (error: any) => ReactElement;
};

type ErrorBoundaryState = {
    /**
     * The error object being thrown
     */
    error: null | Error;
    /**
     * Some object with additional infomation about the error thrown
     */
    errorInfo: null | ErrorInfo;
};
/**
 *@description this component should be a wrapper for the entire react app
 * for catching any internal errors as much as possible to ensure no backtrace
 * or console logging being display back to the browser / user
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.error !== null) {
            return <Fragment>{this.props.renderFallbackComponent?.(this.state.error)}</Fragment>;
        }
        return <Fragment>{this.props.children}</Fragment>;
    }
}
