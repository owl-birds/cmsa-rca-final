import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./App.scss";

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
