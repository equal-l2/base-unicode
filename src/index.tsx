/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");

// biome-ignore lint/style/noNonNullAssertion: used by the template
render(() => <App />, root!);
