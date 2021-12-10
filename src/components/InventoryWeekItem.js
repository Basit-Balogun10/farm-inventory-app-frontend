import React from "react";
import { Link } from "react-router-dom";
import { FaCheckSquare } from "react-icons/fa";
import { FiDownloadCloud, FiEye } from "react-icons/fi";

const InventoryWeekItem = ({ week }) => {
    return (
        <div className="p-6 shadow-md my-4 flex justify-between items-center">
            <div className="flex justify-between items-center space-x-4">
                <FaCheckSquare class="text-green-500 text-2xl"/>
                <h3 className="font-bold text-lg">WEEK {week.id}</h3>
            </div>
            <div className="flex items-center justify-between space-x-4">
                <Link to="/app/broilers" state={{newWeek: false, week: week}} className="flex justify-between items-center bg-blue-500 text-white px-2 py-2 hover:bg-white border-2 border-blue-500 hover:text-blue-500 rounded-md space-x-2 transition-all">
                    <FiEye />
                    <p>View Week Report</p>
                </Link>
                {/* <button className="flex justify-between items-center bg-white text-blue-500 px-2 py-2 rounded-md space-x-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                    <FiDownloadCloud />
                    <p>Download Week Report</p>
                </button> */}
            </div>
        </div>
    );
};

export default InventoryWeekItem;
