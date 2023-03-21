import { createBrowserRouter } from "react-router-dom";
import Choose_CMSA from "../presentation/pages/cmsa/choose/Choose_CMSA";
import One_Level from "../presentation/pages/cmsa/one_level/One_Level";
import Three_Level from "../presentation/pages/cmsa/three_level/Three_Level";
import Two_Level from "../presentation/pages/cmsa/two_level/Two_Level";
import Home from "../presentation/pages/home/Home";
import Layout from "../presentation/pages/layout/Layout";
import RCA from "../presentation/pages/rca/RCA";

const router = createBrowserRouter([
  //
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/main",
    element: <Layout />,
    children: [
      {
        path: "cmsa",
        element: <Choose_CMSA />,
      },
      {
        path: "cmsa/three-level",
        element: <Three_Level />,
      },
      {
        path: "cmsa/two-level",
        element: <Two_Level />,
      },
      {
        path: "cmsa/one-level",
        element: <One_Level />,
      },
      {
        path: "rca",
        element: <RCA />,
      },
    ],
  },
]);

export default router;
