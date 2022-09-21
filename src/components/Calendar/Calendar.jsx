import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import classes from "./Calendar.module.css";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [availableSlotsPerMonth, setAvailableSlotsPerMonth] = useState([]);
  //const idMonth = new Date().getMonth() + 1;
  //const idYear = new Date().getFullYear();
  const [idMonth, setIdMonth] = useState(new Date().getMonth()+1)
  const [idYear, setIdYear] = useState(new Date().getFullYear())

  const idOffice = "6328ee5061b1cb36ebf2cb67";

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    axios
      .get(`/api/offices/${idOffice}/availableslots/${idMonth}/${idYear}`)
      .then((availableSlots) => {
        setAvailableSlotsPerMonth(availableSlots.data.data);
      });
  }, [idMonth, idYear]);

  const onChange = (date) => {
    setDate(date);
  };

  const onActiveStartDateChangeHandler = ({ activeStartDate, value, view }) => {
    // console.log("vv:", activeStartDate);
    // setDate(new Date(activeStartDate))
    // console.log(date, "dentro date")
    // idMonth= date.getMonth() 
    // console.log(idMonth, "dentro idMonth")
    // idYear =  date.getFullYear()
    // console.log(idYear, "dentro idYear")

    //idMonth = activeStartDate.getMonth()+1
    //idYear = activeStartDate.getFullYear()

    setIdMonth(activeStartDate.getMonth()+1)
    setIdYear(activeStartDate.getFullYear())

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
          let year = date.getFullYear()

          let availableDay = availableSlotsPerMonth.find(
            (x) => x.day === day && idMonth === month && idYear === year
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
