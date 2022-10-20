export const getOrigin = () => {
    const env = import.meta.env.VITE_ENVIRONMENT;

    if (env === "development") {
        return "http://localhost:3000";
    }
    if (env === "uat") {
        return "https://uat.napigo.co";
    }
    if (env === "production") {
        return "https://www.napigo.co";
    }
};
