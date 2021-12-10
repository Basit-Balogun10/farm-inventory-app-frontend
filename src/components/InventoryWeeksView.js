import React, { useState, useEffect, useContext } from "react";
import InventoryWeekItem from "./InventoryWeekItem";
import { Link } from "react-router-dom";
import { FaNewspaper, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axiosInstance from "../axiosApi";
import { UserContext } from "../App";


const InventoryWeeksView = ({ item }) => {
    // const [inventoryWeeks, setInventoryWeeks] = useState([])
    const [order, setOrder] = useState("asc");
    const { userDetails } = useContext(UserContext);
    console.log("user", userDetails);
    // const { userDetails } = user

    const inventoryWeeks = [
    {
        id: 1,
        broiler_report: {
            id: 1,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.3,
            is_over_weight: false,
            is_under_weight: false,
            is_close_to_being_overweight: false,
            is_close_to_being_underweight: false,
            feed: 4.6,
            consumes_inadequate_feed: false,
            consumes_too_many_feed: false,
            is_close_to_being_underfed: false,
            is_close_to_being_overfed: false,
            temperature: 29,
            is_cold: false,
            is_running_temperature: false,
            is_close_to_the_minimum_temperature: false,
            is_close_to_the_maximum_temperature: true,
        },
        is_concluded: true,
    },
    {
        id: 2,
        broiler_report: {
            id: 2,
            get_age: 160,
            gender: "female",
            color: "black",
            bedding_duration: 7,
            bedding_due: false,
            weight: 1.8,
            is_over_weight: false,
            is_under_weight: false,
            is_close_to_being_overweight: false,
            is_close_to_being_underweight: false,
            feed: 6.4,
            consumes_inadequate_feed: false,
            consumes_too_many_feed: false,
            is_close_to_being_underfed: false,
            is_close_to_being_overfed: false,
            temperature: 27,
            is_cold: false,
            is_running_temperature: false,
            is_close_to_the_minimum_temperature: false,
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: true,
    },
    {
        id: 3,
        broiler_report: {
            id: 3,
            get_age: 130,
            gender: "female",
            color: "Reddish Brown",
            bedding_duration: 14,
            bedding_due: true,
            weight: 2.0,
            is_over_weight: true,
            is_under_weight: false,
            is_close_to_being_overweight: false,
            is_close_to_being_underweight: false,
            feed: 6.7,
            consumes_inadequate_feed: false,
            consumes_too_many_feed: true,
            is_close_to_being_underfed: false,
            is_close_to_being_overfed: false,
            temperature: 25,
            is_cold: false,
            is_running_temperature: false,
            is_close_to_the_minimum_temperature: false,
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: true,
    },
    {
        id: 4,
        broiler_report: {
            id: 4,
            get_age: 180,
            gender: "male",
            color: "white",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.7,
            is_over_weight: false,
            is_under_weight: false,
            is_close_to_being_overweight: false,
            is_close_to_being_underweight: false,
            feed: 6.8,
            consumes_inadequate_feed: false,
            consumes_too_many_feed: false,
            is_close_to_being_underfed: false,
            is_close_to_being_overfed: false,
            temperature: 27,
            is_cold: false,
            is_running_temperature: false,
            is_close_to_the_minimum_temperature: false,
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: true,
    },
];

    
    useEffect(() =>  {
        // const fetchWeeks = async () => {
        //     const res = await axiosInstance.get(`/weeks?email=${userDetails.email}`);
        //     const data = res.data;
        //     setInventoryWeeks(data);
        // }

        // fetchWeeks();
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
            {inventoryWeeks.map((week, index) => (
                <InventoryWeekItem key={index} week={week} />
            ))}
        </>
    );
};

export default InventoryWeeksView;
