/** */
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "development";

/** */
const GO_FINANCE_BASE_URL = import.meta.env.VITE_SERVICES_HOST || "http://localhost:4000";

const serviceURL = {
    GO_FINANCE_BASE_URL,
};
export { ENVIRONMENT, serviceURL };
