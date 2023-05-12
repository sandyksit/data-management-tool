import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "components/layout/app";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import createStore from "redux/createStore";
import reportWebVitals from "./reportWebVitals";
import CustomAlert from "components/common/alert";
import AuthProvider from "providers/AuthProvider";
const store = createStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
    <CustomAlert/>
    <AuthProvider>
      <Router>
        <App />
      </Router>
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
