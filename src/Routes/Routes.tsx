import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Temp from "../Pages/Temp/Temp";
import ProtectedRoute from "../Layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/temp",
        element: (
          <ProtectedRoute role="admin">
            <Temp></Temp>
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
