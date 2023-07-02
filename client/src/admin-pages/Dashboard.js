import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo/logo-main.png";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); //This will be the declarations for toggle of sidebar.
  const storedId = sessionStorage.getItem("session_id"); //Get the session id from the session storage
  const navigate = useNavigate(); //Navigate to a specific path

  //Sidebar toggle action
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 720); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state based on window width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("session_id");
    navigate("/admin");
  };

  useEffect(() => {
    axios
      .get("https://baylerview-api.onrender.com/api/logins")
      .then((response) => {
        const data = response.data.data;
        const matchedData = data.filter((item) => item._id === storedId);
        // console.log(matchedData);
        if (matchedData.length === 0) {
          navigate("/admin");
        } else {
          // Process the matchedData or do something with it
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate, storedId]);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div
          className={`${
            sidebarOpen ? "flex" : "hidden"
          } flex flex-col w-64 bg-gray-800`}
        >
          <div className="flex items-center justify-center h-16 bg-gray-900">
            {/* <span className="text-white font-bold uppercase">Bay-Ler View</span> */}
            <img src={Logo} alt="" className="admin-logo"/>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <span
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Dashboard
              </span>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div className="flex items-center px-4">
              <button
                className="text-gray-500 focus:outline-none focus:text-gray-700"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center pr-4">
              <button
                onClick={handleLogout}
                className="mx-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
            <p className="mt-2 text-gray-600">
              This is an example dashboard using Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
