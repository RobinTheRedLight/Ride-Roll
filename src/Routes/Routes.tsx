import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Temp from "../Pages/Temp/Temp";
import ProtectedRoute from "./AdminRoute";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../Pages/Dashboard/User/userHome";

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
          <ProtectedRoute>
            <Temp></Temp>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserHome></UserHome>,
      },
      {},
      {},
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
