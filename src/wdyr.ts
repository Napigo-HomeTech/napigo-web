import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

if (import.meta.env.VITE_ENVIRONMENT === "development" || import.meta.env.VITE_ENVIRONMENT === "uat") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(React, {
        trackAllPureComponents: false,
    });
}
