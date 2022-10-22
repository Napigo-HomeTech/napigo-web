import { AppConfig } from "@/config/app.config";

export const getOrigin = () => {
    const env = AppConfig.environment;

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
