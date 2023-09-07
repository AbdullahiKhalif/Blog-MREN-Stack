import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SingupPage from "./Pages/SingupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import CreatePostPage from "./Pages/CreatePostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SingupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
    
  </React.StrictMode>
);
