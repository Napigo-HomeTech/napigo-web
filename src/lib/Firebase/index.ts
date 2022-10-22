import { AppConfig } from "@/config/app.config";
import { initializeApp } from "firebase/app";

const app = initializeApp({ ...AppConfig.firebase });

export default app;
