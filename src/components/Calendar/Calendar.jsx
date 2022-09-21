import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import classes from "./Calendar.module.css";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [availableSlotsPerMonth, setAvailableSlotsPerMonth] = useState([]);
  const idMonth = new Date().getMonth() + 1;
  const idYear = new Date().getFullYear();
  const idOffice = "6328ee5061b1cb36ebf2cb67";

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    axios
      .get(`/api/offices/${idOffice}/availableslots/${idMonth}/${idYear}`)
      .then((availableSlots) => {
        setAvailableSlotsPerMonth(availableSlots.data.data);
      });
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  const onActiveStartDateChangeHandler = ({ activeStartDate, value, view }) => {
    console.log("vv:", activeStartDate, value, view);
  };

  return (
    <div>
      <Calendar
        locale="en"
        showNeighboringMonth={false}
        onChange={onChange}
        onActiveStartDateChange={onActiveStartDateChangeHandler}
        value={date}
        tileClassName={({ date }) => {
          let day = date.getDate();
          let month = date.getMonth() + 1;

          let availableDay = availableSlotsPerMonth.find(
            (x) => x.day === day && idMonth === month
          );

          if (availableDay) {
            return classes.oneOrMoreSlots;
          }

          if (!availableDay) {
            //return classes.noSlots;
          }
        }}
      />
      {/* {date.toString()} */}
    </div>
  );
}
