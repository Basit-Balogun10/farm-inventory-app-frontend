import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';
import BroilerItem from './BroilerItem';
import axiosInstance from "../axiosApi"
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import { UserContext } from "../App";

const BroilersView = () => {
  const [previousWeek, setPreviousWeek] = useState({});
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const { userDetails } = useContext(UserContext);
  
  const [broilers, setBroilers] = useState([]);

  let location = useLocation();
  const navigate = useNavigate();

  const week = location.state.week;

  const handleSearchTextChange = async (val) => {
    setSearchText(val);

      const res = await axiosInstance.get(`/broilers?search=${searchText}`)
      const data = res.data;

      setBroilers(data)
  }

  useEffect(() =>  {
    if (!location.state) {
      navigate("/inventory-weeks")
    } else{
      setBroilers(week.broilers);
      const fetchPreviousWeek = async () => {
            const res = await axiosInstance.get(`/weeks/${week.id - 1}?email=${userDetails.email}`);
            const data = res.data;
            setPreviousWeek(data);
        }

        fetchPreviousWeek();
    }
    }, [])

  return (
    <>
      <div className="flex items-center justify-betweeen my-4">
        <input class="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Find Broiler" value={searchText} onChange={handleSearchTextChange} />
        <div className="flex items-center justify-center">
          <FaArrowUp onClick={() => (order === "desc" ? setBroilers(broilers.reverse()) : null)} />
          <FaArrowDown onClick={() => (order === "asc" ? setBroilers(broilers.reverse()) : null)} />
        </div>
      </div>
      <hr />
      {
        broilers.map((broiler, index) => (
          <BroilerItem key={index} broiler={broiler} newWeek={location.state ? location.state.newWeek : false} />
        ))
      }
    </>
  );
}

export default BroilersView;
