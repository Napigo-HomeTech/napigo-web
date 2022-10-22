import "../../lib/Firebase";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "@/lib/Redux/store";
import { ErrorBoundary } from "@/common/ErrorBoundary";
import { ErrorDialog } from "@/common/ErrorDialog";
import { FeatureFlag } from "@/containers/App/FeatureFlag";
import { App } from "./App";
import { PreLaunch } from "./PreLaunch";
import { appTheme } from "@/themes";
import { ChakraProvider } from "@chakra-ui/react";
import { BuildBanner } from "@/build-banner/BuildBanner";
import { AppConfig } from "@/config/app.config";

export const NapigoApp: React.FC = () => {
    return (
        <ChakraProvider theme={appTheme}>
            <BuildBanner />
            <Router>
                {AppConfig.prelaunch === "true" ? (
                    <PreLaunch />
                ) : (
                    <Provider store={store}>
                        <ErrorBoundary renderFallbackComponent={(err) => <ErrorDialog err={err} closeable={true} />}>
                            <FeatureFlag>
                                <App />
                            </FeatureFlag>
                        </ErrorBoundary>
                    </Provider>
                )}
            </Router>
        </ChakraProvider>
    );
};
