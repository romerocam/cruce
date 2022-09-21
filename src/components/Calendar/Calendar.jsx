import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import classes from "./Calendar.module.css";
import { Select } from "@chakra-ui/react";

export default function NewBookingCalendar() {
  const [date, setDate] = useState(new Date());
  const [availableSlotsPerMonth, setAvailableSlotsPerMonth] = useState([]);
  const [idMonth, setIdMonth] = useState(new Date().getMonth() + 1);
  const [idYear, setIdYear] = useState(new Date().getFullYear());
  const [idOffice, setIdOffice] = useState(null);
  const [listOfOffices, setListOfOffices] = useState([]);
  //const idOffice = "6328ee5061b1cb36ebf2cb67";

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    axios.get(`/api/offices`).then((listOfOffices) => {
      setListOfOffices(listOfOffices.data.data);
    });
  }, []);

  console.log(listOfOffices, "list of offices");

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    axios
      .get(`/api/offices/${idOffice}/availableslots/${idMonth}/${idYear}`)
      .then((availableSlots) => {
        setAvailableSlotsPerMonth(availableSlots.data.data);
      });
  }, [idOffice, idMonth, idYear]);

  const onChange = (date) => {
    setDate(date);
  };

  const onChangeOffice = (event) => {
    setIdOffice(event.target.value);
    if (!event.target.value) {
      setAvailableSlotsPerMonth([]);
    }
  };

  const onActiveStartDateChangeHandler = ({ activeStartDate, value, view }) => {
    setIdMonth(activeStartDate.getMonth() + 1);
    setIdYear(activeStartDate.getFullYear());
  };

  return (
    <div>
      <Select placeholder="Select office" onChange={onChangeOffice}>
        {listOfOffices.map((office) => {
          return <option value={office._id}>{office.name}</option>;
        })}
      </Select>

      {idOffice && (
        <Calendar
          disable={true}
          locale="en"
          showNeighboringMonth={false}
          onChange={onChange}
          onActiveStartDateChange={onActiveStartDateChangeHandler}
          value={date}
          tileClassName={({ date }) => {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

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
      )}

      {/* {date.toString()} */}
    </div>
  );
}
