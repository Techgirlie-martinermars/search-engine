import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SearchEngine from "./Search";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <small>
      <a
        href="https://github.com/Techgirlie-martinermars/weather-search-engine"
        target="_blank"
      >
        Open-source code
      </a>
      by Martiner Winceit and hosted on netlify
    </small>
  </StrictMode>
);
