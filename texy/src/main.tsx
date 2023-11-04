import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/app.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { chatsApi } from "./store/chatApiSlice.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ApiProvider api={chatsApi}>
                <App />
            </ApiProvider>
        </Provider>
    </React.StrictMode>
);
