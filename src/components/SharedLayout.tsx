/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AiFillAppstore } from "react-icons/ai";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

type Props = {};

const SharedLayout = (props: Props) => {
  const { logout } = useContext(AuthContext);

  return (
    <div id="layout" className="h-screen">
      <nav className=" flex h-16 w-full justify-between bg-[#111827] px-8 py-4 text-white">
        <h1 id="logo" className="text-2xl">
          Your Logo
        </h1>
        <div
          id="log_out"
          className="flex cursor-pointer items-center justify-center text-2xl"
          onClick={() => logout()}
        >
          <FiLogOut />
        </div>
      </nav>
      <div
        id="main_content"
        className=" flex  h-[calc(100vh-64px)] bg-[#F6F6F7]"
      >
        <aside className="h-full basis-[350px] overflow-y-scroll bg-white py-8 shadow">
          <ul id="side_nav" className="px-4">
            <li className="mb-4 text-xl font-bold text-[#111827]">
              <Link
                to="/"
                className="flex items-center space-x-2 rounded-lg px-4 py-2 text-2xl hover:bg-[rgba(17,24,39,.25)]"
                style={
                  window.location.pathname === "/"
                    ? {
                        color: "#111827",
                        backgroundColor: "rgba(17,24,39,0.25)",
                      }
                    : {}
                }
              >
                <span>
                  <AiFillAppstore />
                </span>
                <span>Products</span>
              </Link>
            </li>
            <li className="mb-4 text-xl font-bold text-[#111827]">
              <Link
                to="/stores"
                className="flex items-center space-x-2 rounded-lg px-4 py-2 text-2xl hover:bg-[rgba(17,24,39,0.25)]"
                style={
                  window.location.pathname === "/stores"
                    ? { color: "#111827", backgroundColor: "#F6F6F7" }
                    : {}
                }
              >
                <span>
                  <IoStorefrontSharp />
                </span>
                <span>Stores</span>
              </Link>
            </li>
          </ul>
        </aside>
        <main className="h-full basis-[calc(100%-350px)] bg-[#F6F6F7] p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;
