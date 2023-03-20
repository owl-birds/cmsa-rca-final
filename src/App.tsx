import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
