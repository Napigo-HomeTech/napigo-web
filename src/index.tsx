import "./index.css";
import ReactDOM from "react-dom/client";
import { NapigoApp } from "./containers/App";

const root = ReactDOM.createRoot(document.getElementById("app-napigo") as HTMLElement);
/**
 * @experiment the use of stric mode in production  to see for any
 * side effects happen when use, in dev mode.. turn it off
 */
root.render(<NapigoApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
