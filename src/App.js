import React, { useState, useEffect, createContext, useReducer } from 'react';
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axiosInstance from "./axiosApi";

export const UserContext = createContext();

export const initialUserState = {
    isLoggedIn: false,
    email: "",
    firstname: "",
    lastname: "",
    organization_name: "",
    id: "",
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "log in":
            return {
                isLoggedIn: true,
                email: action.payload.email,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                organization_name: action.payload.organization_name,
                id: action.payload.id,
            };

        case "log out":
            return initialUserState;

        default:
            return state;
    }
};

function App() {
  const [user, dispatchUser] = useReducer(userReducer, initialUserState);
  const [userDetails, setUserDetails] = useState({})
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
        "access_token",
        "refresh_token",
    ]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!cookies.access_token) {
    //         console.log("not logged in");
    //         navigate("/login");
    //   } else {
    //       console.log("logged in");}
  })

  const getUserDetails = async (email) => {
        try {
            const res = await axiosInstance.get(`/users?email=${email}`);
            const data = res.data;
            console.log("userdata", data[0]);
            setUserDetails(data[0]);
            return data[0];
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (email, password) => {
        try {
            // const res = await axiosInstance.post("/auth/token/obtain/", {
            //     email,
            //     password,
            // });
            // const data = res.data;
            // axiosInstance.defaults.headers["Authorization"] =
            //     "JWT " + data.access;
            // console.log(data);
            // setCookie("access_token", data.access, {
            //     path: "/",
            //     // httpOnly: true,
            //     maxAge: 60 * 60 * 24 * 7,
            //     sameSite: "lax",
            // });
            // setCookie("refresh_token", data.refresh, {
            //     path: "/",
            //     // httpOnly: true,
            //     maxAge: 60 * 60 * 24 * 7,
            //     sameSite: "lax",
            // });
            // console.log(cookies);
            // const userDetails = await getUserDetails(email);
            // console.log("ud", userDetails);
            // dispatchUser({
            //     type: "log in",
            //     payload: {
            //         email,
            //         username: userDetails.username,
            //         id: userDetails.id,
            //     },
            // });
            // return data;
            navigate("/app/inventory0weeks");
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        // try {
        //     const response = await axiosInstance.post("/blacklist/", {
        //         refresh_token: cookies.refresh_token,
        //     });
        //     removeCookie("access_token");
        //     removeCookie("refresh_token");
        //     dispatchUser({ type: "log out" });
        //     axiosInstance.defaults.headers["Authorization"] = null;
        navigate("/login");
            // return response;
        // } catch (e) {
        //     console.log(e);
        // }
    };

  return (
    <UserContext.Provider
        value={{ userDetails, dispatchUser, login, handleLogout, getUserDetails }}
    >
    <div className="flex items-center justify-center h-screen">
      {
        location.pathname.includes("/app") && (
            <>
              <Sidebar sidebarCollapse={sidebarCollapse} />
              <MainContent sidebarCollapse={sidebarCollapse} setSidebarCollapse={setSidebarCollapse} />
            </>
          )
      }
      
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
