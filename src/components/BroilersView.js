import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';
import BroilerItem from './BroilerItem';
import axiosInstance from "../axiosApi"
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import { UserContext } from "../App";

const BroilersView = () => {
  const broilers =[
    {
            id: 1,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.3,
            is_overweight: false,
            is_underweight: false,
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
        {
            id: 2,
            get_age: 160,
            gender: "female",
            color: "black",
            bedding_duration: 7,
            bedding_due: false,
            weight: 1.8,
            is_overweight: false,
            is_underweight: false,
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
        },{
            id: 3,
            get_age: 130,
            gender: "female",
            color: "Reddish Brown",
            bedding_duration: 14,
            bedding_due: true,
            weight: 2.0,
            is_overweight: true,
            is_underweight: false,
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
        },{
            id: 4,
            get_age: 180,
            gender: "male",
            color: "white",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.7,
            is_overweight: false,
            is_underweight: false,
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
  ]
  const [previousWeek, setPreviousWeek] = useState({});
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("asc");
  const { userDetails } = useContext(UserContext);
  
  const [myBroilers, setBroilers] = useState(broilers);

  let location = useLocation();
  const navigate = useNavigate();

  const handleSearchTextChange = async (val) => {
    setSearchText(val);

      const res = await axiosInstance.get(`/broilers?search=${searchText}`)
      const data = res.data;

      // setBroilers(data)
  }

  useEffect(() =>  {
    if (!location.state) {
      navigate("/app/inventory-weeks")
    } else{
      // setBroilers(week.broilers);
      // const fetchPreviousWeek = async () => {
      //       const res = await axiosInstance.get(`/weeks/${week.id - 1}?email=${userDetails.email}`);
      //       const data = res.data;
      //       setPreviousWeek(data);
      //   }

      //   fetchPreviousWeek();
    }
    }, [])

  return (
    <>
      <div className="flex items-center justify-around my-4">
        <input class="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Find Broiler" value={searchText} onChange={handleSearchTextChange} />
        <div className="flex items-center justify-center space-x-2">
          <FaArrowUp onClick={() => (order === "desc" ? setBroilers(broilers.reverse()) : null)} className="cursor-pointer text-green-500" />
          <FaArrowDown onClick={() => (order === "asc" ? setBroilers(broilers.reverse()) : null)} className="cursor-pointer text-green-500" />
        </div>
      </div>
      <hr />
      {
        myBroilers.map((broiler, index) => (
          <BroilerItem key={index} broiler={broiler} newWeek={location.state ? location.state.newWeek : false} />
        ))
      }
    </>
  );
}

export default BroilersView;
