import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { RuntimeDataProvider } from "./data/runtimeData";
import "./index.css";
import { useFolioDevPreviewData } from "./preview/useFolioDevPreviewData";

function PortfolioRuntimeRoot() {
  const { isPreviewMode, previewData } = useFolioDevPreviewData();

  return (
    <RuntimeDataProvider data={previewData}>
      <ThemeProvider
        disableStorage={isPreviewMode}
        previewThemeId={previewData?.siteConfig.theme.activeTheme}
      >
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </RuntimeDataProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioRuntimeRoot />
  </StrictMode>,
);
