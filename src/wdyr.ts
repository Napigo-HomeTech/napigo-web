import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import { AppConfig } from "./config/app.config";

const env = AppConfig.environment;
if (env === "development" || env === "uat") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(React, {
        trackAllPureComponents: false,
    });
}
