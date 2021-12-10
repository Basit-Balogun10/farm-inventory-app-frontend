import React from "react";
import {
    ProSidebar,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    Menu,
    MenuItem,
    SubMenu,
    image,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
    FaCalendar,
    FaBell,
    FaUser,
    FaPen,
    FaSignOutAlt,
    FaChartLine,
} from "react-icons/fa";
import { GiChicken } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location, "location-path");

    const PROFILE_PHOTO_URL =
        "data:image/jpeg;base64,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";
    return (
        <div className="h-screen">
            <ProSidebar
                collapsed={sidebarCollapse}
                breakPoint="sm"
                toggled="true"
            >
                <SidebarHeader>
                    <div className="flex items-center justify-between p-2">
                        {!sidebarCollapse && (
                            <h3 className="font-bold text-black">
                                EXTRA LARGE FARMS LTD
                            </h3>
                        )}
                        <img
                            src={PROFILE_PHOTO_URL}
                            className="rounded-full h-16 w-16"
                        />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        {/* <MenuItem active={true} icon={<FaChartLine />}>Dashboard</MenuItem> */}
                        <MenuItem
                            active={location.pathname === "/app/inventory-weeks"}
                            icon={<FaCalendar />}
                            onClick={() => {
                                navigate("/app/inventory-weeks");
                            }}
                        >
                            Inventory Weeks
                        </MenuItem>
                        <MenuItem
                        active={location.pathname === "/app/new-broiler"}
                            icon={<GiChicken />}
                            onClick={() => {
                                navigate("/app/new-broiler");
                            }}
                        >
                            Add New Broiler to Stock
                        </MenuItem>
                        <MenuItem
                        active={location.pathname === "/app/broilers"}
                            icon={<GiChicken />}
                            onClick={() => {
                                navigate("/app/broilers");
                            }}
                        >
                            Broilers
                        </MenuItem>
                        <MenuItem
                        active={location.pathname === "/app/notifications"}
                            icon={<FaBell />}
                            onClick={() => {
                                navigate("/app/notifications");
                            }}
                        >
                            Notifications Center
                        </MenuItem>
                        <SubMenu title="Manage Account" icon={<FaUser />}>
                            <MenuItem
                            active={location.pathname === "/app/account"}
                                icon={<FaPen />}
                                onClick={() => {
                                    navigate("/app/account");
                                }}
                            >
                                Edit Account Details
                            </MenuItem>
                            <MenuItem onClick={() => console.log("loggin' out...")} icon={<FaSignOutAlt />}>Logout</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    {!sidebarCollapse && (
                        <p className="text-center">
                            &copy; 2021 All rights reserved
                        </p>
                    )}
                </SidebarFooter>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
