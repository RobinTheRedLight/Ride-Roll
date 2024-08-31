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
import UserHome from "../Pages/Dashboard/User/UserHome";
import ManageBikes from "../Pages/Dashboard/User/ManageBikes";
import BikeDetails from "../Pages/Dashboard/User/BikeDetails";
import ConfirmPayment from "../Pages/Dashboard/User/ConfirmPayment";
import Rental from "../Pages/Dashboard/User/Rental";
import RentalPayment from "../Pages/Dashboard/User/RentalPayment";

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
      {
        path: "bikes",
        element: <ManageBikes></ManageBikes>,
      },
      {
        path: "bikes/:id",
        element: <BikeDetails></BikeDetails>,
      },
      {
        path: "payment/:id",
        element: <ConfirmPayment></ConfirmPayment>,
      },
      {
        path: "pay/:id",
        element: <RentalPayment></RentalPayment>,
      },
      {
        path: "rentals",
        element: <Rental></Rental>,
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
