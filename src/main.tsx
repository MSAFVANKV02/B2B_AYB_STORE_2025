import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import rootRouter from "./routers/RootRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import axios from "axios";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.baseURL = "https://gateway.ayaboo.com";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      {/* <ModalProvider> */}
      <RouterProvider
        router={rootRouter}
        future={{
          v7_startTransition: true,
        }}
      />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
        }}
        containerStyle={{
          zIndex: "100009",
        }}
        gutter={14}
      />
      {/* </ModalProvider> */}
    </Provider>
  </I18nextProvider>
);
