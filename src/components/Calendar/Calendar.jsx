import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import classes from "./Calendar.module.css";
import {
  Button,
  Select,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ModalComponent from "../common/ModalComponent/ModalComponent";

export default function NewBookingCalendar() {
  //States
  const [date, setDate] = useState(new Date());
  const [availableSlotsPerMonth, setAvailableSlotsPerMonth] = useState([]);
  const [availableSlotsPerDay, setAvailableSlotsPerDay] = useState([]);
  const [idMonth, setIdMonth] = useState(new Date().getMonth() + 1);
  const [idYear, setIdYear] = useState(new Date().getFullYear());
  const [idOffice, setIdOffice] = useState(null);
  const [listOfOffices, setListOfOffices] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  //Constants
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = session && session.user.id;
  const router = useRouter();

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    axios.get(`/api/offices`).then((listOfOffices) => {
      setListOfOffices(listOfOffices.data.data);
    });
  }, []);

  // TODO: replace axios request by getServerSideProps
  useEffect(() => {
    if (idOffice && idMonth && idYear) {
      axios
        .get(`/api/offices/${idOffice}/availableslots/${idMonth}/${idYear}`)
        .then((availableSlots) => {
          setAvailableSlotsPerMonth(availableSlots.data.data);
        });
    } else {
      cleanSlots();
    }
  }, [idOffice, idMonth, idYear]);

  const setAppointment = () => {
    axios({
      method: "POST",
      data: {
        date: date,
        startAt: selectedSlot,
        office: idOffice,
        user: id,
      },
      url: "/api/bookings",
    })
      .then(() => {
        router.push("/users/my-appointments");
      })
      .catch((error) => {
        setTitle(error.response.data.title);
        setMessage(error.response.data.message);
        onOpen();
        console.log(error);
      });
  };

  const onChange = (date) => {
    setDate(date);
    let day = date.getDate();
    let slotsPerDay = [];
    availableSlotsPerMonth.forEach((availableDay) => {
      if (availableDay.day === day) {
        availableDay.slots.forEach((slot) => {
          slotsPerDay.push(slot.time);
        });
      }
    });
    setAvailableSlotsPerDay(slotsPerDay);
  };

  const onChangeOffice = (event) => {
    cleanSlots();
    setIdOffice(event.target.value);
  };

  const onActiveStartDateChangeHandler = ({ activeStartDate, value, view }) => {
    setIdMonth(activeStartDate.getMonth() + 1);
    setIdYear(activeStartDate.getFullYear());
    cleanSlots();
  };

  const onClickSlotHandler = (slot) => {
    setSelectedSlot(slot);
  };

  const cleanSlots = () => {
    setAvailableSlotsPerMonth([]);
    setAvailableSlotsPerDay([]);
    setSelectedSlot(null);
  };

  return (
    <>
    <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        props={{ title, message }}
      />
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)">
      <GridItem
        colSpan={{ base: "2", md: "1", lg: "1" }}
        rowSpan="1"
        alignSelf="auto"
        m={5}
      >
        <Text fontSize="xl" as="b" color="teal">
          Select office and day
        </Text>
        <Select
          placeholder="Select office"
          onChange={onChangeOffice}
          mb={10}
          maxWidth="350px"
          mt={5}
        >
          {listOfOffices.map((office, i) => {
            return (
              <option key={i} value={office._id}>
                {office.name}
              </option>
            );
          })}
        </Select>
        {idOffice && (
          <Calendar
            minDetail="month"
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
                let totalAvailable = 0;
                availableDay.slots.forEach((slot) => {
                  totalAvailable += slot.capacity;
                });

                if (totalAvailable >= 10) {
                  return classes.tenOrMoreSlots;
                }

                if (totalAvailable >= 5) {
                  return classes.fiveOrMoreSlots;
                }

                if (totalAvailable >= 2) {
                  return classes.twoOrMoreSlots;
                }

                if (totalAvailable === 1) {
                  return classes.lastSlot;
                }
              } else {
                return classes.noSlots;
              }
            }}
          />
        )}
      </GridItem>
      <GridItem
        colSpan={{ base: "2", md: "1", lg: "1" }}
        rowSpan="1"
        alignSelf="auto"
        m={5}
      >
        {availableSlotsPerMonth.length ? (
          <div className={classes.itemMainContainer}>
            <Text fontSize="xl" as="b" color="teal">
              Select slot
            </Text>
            <div className={classes.slotsContainer}>
              {availableSlotsPerDay.map((slot, i) => {
                return (
                  <div key={i} className={classes.itemSlot}>
                    <Button
                      colorScheme="teal"
                      onClick={() => {
                        onClickSlotHandler(slot);
                      }}
                    >
                      {slot}
                    </Button>
                  </div>
                );
              })}
            </div>
            {selectedSlot && (
              <div style={{ marginTop: 20 }}>
                <Text fontSize="xl" as="b" color="green">
                  You selected the following slot: {selectedSlot}; please
                  confirm!
                </Text>
              </div>
            )}
            {availableSlotsPerDay.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <Button colorScheme="green" onClick={setAppointment}>
                  Confirm
                </Button>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </GridItem>
    </Grid>
    </>
    
  );
}
