import React, { useState, useEffect, useContext } from "react";
import InventoryWeekItem from "./InventoryWeekItem";
import { Link } from "react-router-dom";
import { FaNewspaper, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axiosInstance from "../axiosApi";
import { UserContext } from "../App";

const InventoryWeeksView = ({ item }) => {
    const [inventoryWeeks, setInventoryWeeks] = useState([])
    const [order, setOrder] = useState("asc");
    const { userDetails } = useContext(UserContext);
    console.log("user", userDetails);
    // const { userDetails } = user
    
    useEffect(() =>  {
        const fetchWeeks = async () => {
            const res = await axiosInstance.get(`/weeks?email=${userDetails.email}`);
            const data = res.data;
            setInventoryWeeks(data);
        }

        fetchWeeks();
    }, [])

    return (
        <>
            <div className="flex items-center justify-end my-4">
                <Link
                    to="/app/broilers"
                    state={{ newWeek: true }}
                    className="bg-green-500 text-white px-2 py-3 rounded-md mr-4 flex justify-between items-center space-x-2 border-2 hover:bg-white border-green-500 hover:text-green-500 transition-all"
                >
                    <FaNewspaper />
                    <p>Record New Inventory Week</p>
                </Link>
            </div>
            <hr />
            {inventoryWeeks.map((item, index) => (
                <InventoryWeekItem key={index} item={item} />
            ))}
        </>
    );
};

export default InventoryWeeksView;
