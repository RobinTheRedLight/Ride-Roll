import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { BiKey } from "react-icons/bi";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const Dashboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector(selectCurrentUser) as any;

  const closeDrawer = (): void => {
    const drawerCheckbox = document.getElementById(
      "my-drawer-2"
    ) as HTMLInputElement;
    if (drawerCheckbox && drawerCheckbox.checked) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="flex btn btn-outline mt-5 drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-white">
          {user.role === "admin" ? (
            <>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/profile">
                  <FaHome /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/admin/bikes">
                  <MdOutlineDirectionsBike />
                  Bike Management
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/manageitems">
                  <TfiMenuAlt /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="mycart">
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="allusers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/profile">
                  <FaHome /> User Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/bikes">
                  <MdOutlineDirectionsBike />
                  Bike Management
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="/dashboard/rentals">
                  <BiKey /> My Rentals
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeDrawer} to="mycart">
                  <FaShoppingCart /> My Cart
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink onClick={closeDrawer} to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeDrawer} to="/menu">
              <IoMenu /> Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeDrawer} to="/shop/salads">
              <FaShoppingCart /> Order Food
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
