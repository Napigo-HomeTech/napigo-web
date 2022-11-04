import React, { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { featureFlags, getFeatureFlags } from "@/config/feature-flags";
import { AppConfig } from "@/config/app.config";

const growthbook = new GrowthBook({
    trackingCallback: (experiment, result) => {
        // eslint-disable-next-line no-console
        console.log({
            experimentId: experiment.key,
            variationId: result.variationId,
        });
    },
});

type FeatureFlagProps = {
    children: React.ReactNode;
};
export const FeatureFlag: React.FC<FeatureFlagProps> = ({ children }) => {
    const FEATURE_ENDPOINT = AppConfig.featureFlag.url;

    useEffect(() => {
        /**
         * Use the local featureFlag configs only in development Mode
         */
        if (AppConfig.environment === "development") {
            growthbook.setFeatures(
                getFeatureFlags([featureFlags.enable_alternative_email_backup])
            );
            return;
        }
        fetch(FEATURE_ENDPOINT)
            .then((res) => res.json())
            .then((json) => {
                growthbook.setFeatures(json.features);
            });
    }, [FEATURE_ENDPOINT]);

    return (
        <GrowthBookProvider growthbook={growthbook}>
            {children}
        </GrowthBookProvider>
    );
};
