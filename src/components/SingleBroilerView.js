import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BroilerItemForm from "./BroilerItemForm";

const inventoryWeeks = [
    {
        id: 1,
        broiler_report: {
            id: 3,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.4,
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
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: true,
    },
    {
        id: 2,
        broiler_report: {
            id: 3,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.4,
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
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: false,
    },
    {
        id: 3,
        broiler_report: {
            id: 3,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.4,
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
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: false,
    },
    {
        id: 4,
        broiler_report: {
            id: 3,
            get_age: 110,
            gender: "male",
            color: "black",
            bedding_duration: 14,
            bedding_due: true,
            weight: 1.4,
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
            is_close_to_the_maximum_temperature: false,
        },
        is_concluded: true,
    },
];

const MALE_BROILER_IMAGE_SRC =
      "data:image/jpeg;base64,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";
  
  const FEMALE_BROILER_IMAGE_SRC =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pzb9gpuEEdfOsscf4yjk2W9VRskE8Lx2KA&usqp=CAU";

const SingleBroilerView = () => {
    const [beddingFormDisplay, setBeddingFormDisplay] = useState(false);

    const { state } = useLocation();
  const { broiler } = state;
  return (
      <>
          <div className="pt-6 pr-6 shadow-md my-4 flex justify-center space-x-10 items-center">
              <img
                  src={
                      broiler.gender === "male"
                          ? MALE_BROILER_IMAGE_SRC
                          : FEMALE_BROILER_IMAGE_SRC
                  }
                  className="h-36 w-36 rounded"
              />
              <div className="flex-col items-center justify-around">
                  <p className="">
                      <span className="font-bold">BROILER ID: </span>BR-
                      {broiler.id}
                  </p>
                  <p className="">
                      <span className="font-bold">GENDER: </span>
                      {broiler.gender.toUpperCase()}
                  </p>
                  <p className="">
                      <span className="font-bold">COLOR: </span>
                      {broiler.gender.color}
                  </p>
                  <BroilerItemForm
                      type="date"
                      placeholder="Update bedding date"
                      ariaLabel="Animal Bedding Date"
                      buttonText="Update Animal Bedding Date"
                  />
              </div>
          </div>
          <hr />
          <p className="font-bold text-lg text-center">
              CUMMULATIVE WEEKLY REPORT OF BR-{broiler.id}
          </p>
          <table class="overflow-scroll mx-4 table-auto text-green-500">
              <thead>
                  <tr class="bg-green-400 bg-opacity-60">
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          AGE (DAYS)
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          BEDDING DURATION (DAYS)
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          BEDDING DUE
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          WEIGHT (KG)
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS OVERWEIGHT
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS UNDERWEIGHT
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO BEING OVERWEIGHT
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO BEING UNDERWEIGHT
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          FEED CONSUMED (KG)
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          CONSUMES INADEQUATE FEED
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          CONSUMES TOO MANY FEED
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO BEING UNDERFED
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO BEING OVERFED
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          AVERAGE TEMPERATURE (&deg;C)
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS COLD
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS RUNNING TEMPERATURE
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO MINIMUM TEMPERATURE
                      </th>
                      <th class="text-center border-2 border-green-500 px-4 py-2">
                          IS CLOSE TO MAXIMUM TEMPERATURE
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {inventoryWeeks.map((week) => (
                      <tr class="bg-green-100">
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.get_age}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.bedding_duration}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.bedding_due}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.weight}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_over_weight}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_under_weight}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_close_to_being_overweight}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {
                                  week.broiler_report
                                      .is_close_to_being_underweight
                              }
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.feed}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.consumes_inadequate_feed}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.consumes_too_many_feed}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_close_to_being_underfed}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_close_to_being_overfed}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.temperature}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_cold}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {week.broiler_report.is_running_temperature}
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {
                                  week.broiler_report
                                      .is_close_to_the_minimum_temperature
                              }
                          </td>
                          <td class="text-center border-2 border-green-500 px-4 py-2">
                              {
                                  week.broiler_report
                                      .is_close_to_the_maximum_temperature
                              }
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </>
  );
};

export default SingleBroilerView;
