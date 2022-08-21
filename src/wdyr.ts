/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";

if (
  import.meta.env.VITE_ENVIRONMENT === "development" ||
  import.meta.env.VITE_ENVIRONMENT === "uat"
) {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
