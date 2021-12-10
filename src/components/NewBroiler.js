import React, { useState, useEffect, useContext } from "react";
import { FiArrowDown } from "react-icons/fi";
import { UserContext } from "../App";
import axiosInstance from "../axiosApi";


const NewBroiler = () => {
  const [DOB, setDOB] = useState("");
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [beddingDate, setBeddingDate] = useState("");
  const [averageFeed, setAverageFeed] = useState(0);
  const [averageTemperature, setAverageTemperature] = useState(0);
  const user = useContext(UserContext);

  const { userDetails } = user;

  const addBroiler = async () => {
    const broiler = {
      user: userDetails.email,
      date_of_birth: DOB,
      animal_bedding_date: beddingDate,
      color,
      gender,
      weight,
      feed: averageFeed,
      temperature: averageTemperature
    }

    try {
      const res = await axiosInstance.post("/broilers/", broiler);
      const data = res.data;

      window.alert("BROILER ADDED SUCCESSFULLY");
      setDOB("")
      setBeddingDate("")
      setColor("")
      setGender("")
      setWeight(0)
      setAverageFeed(0)
      setAverageTemperature(0)
    } catch (error) {
      console.log("SOMETHING WENT WRONG WHILE ADDING BROILER", error)
    }
  }
    return (
        <div>
        <h3 class="font-bold my-2 text-xl tex-center text-green-500">ADD A NEW BROILER TO YOUR STOCK</h3>
        <p class="text-grey-500 text-sm italic">All fields are required.</p>
        <hr />
        <div className="flex items-center justify-center">
          <form class="lg:w-3/4"onSubmit={addBroiler} >
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date-of-birth">
        Date of Birth
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="date" value={DOB} onChange={(e) => setDOB(e.target.value)}/>
      <p class="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="weight">
        Weight
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Weight in KG" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <p class="text-gray-600 text-xs italic">Retype the password entered above for confirmation</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="broiler-gender">
        Gender
      </label>
      <div class="relative">
          <select class="block appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="broiler-gender" value={gender} onChange={(e) => setGender(e.target.value)} onBlur={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
          <FiArrowDown class="absolute inset-y-0 right-0"/>
      </div>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="broiler-color">
        Color
      </label>
      <div class="relative">
          <select class="block appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="broiler-color" value={color} onChange={(e) => setColor(e.target.value)} onBlur={(e) => setColor(e.target.value)}>
              <option value="white">White</option>
              <option value="white">Black</option>
              <option value="white">Reddish-brown</option>
          </select>
          <FiArrowDown class="absolute inset-y-0 right-0"/>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="animal-bedding-duration">
        Animal Bedding Date
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Since when has the current bedding being in use?" type="date" value={beddingDate} onChange={(e) => setBeddingDate(e.target.value)} />
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="average-feed-consumed">
        Average Feed Consumed 
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Average feed consumed weekly in KG" value={averageFeed} onChange={(e) => setAverageFeed(e.target.value)} />
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="average-temperature">
        Average Temperature
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Average temperature in degree celsius" value={averageTemperature} onChange={(e) => setAverageTemperature(e.target.value)} />
      <p class="text-gray-600 text-xs italic">Retype the password entered above for confirmation</p>
    </div>
  </div>
  <div class="md:flex md:items-center">
        <button
            class="shadow bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
        >
            Add broiler to stock
        </button>
  </div>
</form>
</div>
</div>
    );
}

export default NewBroiler;
