import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ProtectedRoute from "./AdminRoute";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../Pages/Dashboard/User/UserHome";
import ManageBikes from "../Pages/Dashboard/User/ManageBikes";
import BikeDetails from "../Pages/Dashboard/User/BikeDetails";
import ConfirmPayment from "../Pages/Dashboard/User/ConfirmPayment";
import Rental from "../Pages/Dashboard/User/Rental";
import RentalPayment from "../Pages/Dashboard/User/RentalPayment";
import AllBikes from "../Pages/Dashboard/Admin/AllBikes";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ReturnBike from "../Pages/Dashboard/Admin/ReturnBike";
import NotFound from "../components/NotFound";
import CouponManagement from "../Pages/Dashboard/Admin/CouponManagement";
import AllBikesPage from "../Pages/Home/AllBikesPage/AllBikesPage";
import DetailsOfBike from "../Pages/Home/DetailsOfBike/DetailsOfBike";
import { BikeComparison } from "../Pages/Dashboard/User/BikeComparison";

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
        path: "/bikes",
        element: <AllBikesPage></AllBikesPage>,
      },
      {
        path: "/bikes/:id",
        element: <DetailsOfBike></DetailsOfBike>,
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
      {
        path: "compare",
        element: <BikeComparison></BikeComparison>,
      },
      {
        path: "admin/bikes",
        element: (
          <ProtectedRoute>
            <AllBikes></AllBikes>
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <AllUsers></AllUsers>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/rentals",
        element: (
          <ProtectedRoute>
            <ReturnBike></ReturnBike>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/coupon",
        element: (
          <ProtectedRoute>
            <CouponManagement></CouponManagement>
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

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
