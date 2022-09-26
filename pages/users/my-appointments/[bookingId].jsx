import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from "next/router"
import SingleAppointment from "../../../src/components/Appointments/SingleAppointment"
import Layout from "../../../src/components/common/Layout/Layout"
import NewBookingCalendar from "../../../src/components/Calendar/Calendar"

const SingleAppointmentPage = () => {
const router = useRouter()
const {bookingId} = router.query

 const [booking, setBooking] = useState({})
 const [offices, setOffices] = useState([]);

 useEffect(() => {
    axios.get(`/api/bookings/${bookingId}`)
    .then(response=>{setBooking(response.data.data)})
    .catch(error=>error)

    axios.get("/api/offices").then((officesArray) => {
        setOffices(officesArray.data.data);
      });
 }, [])
 

  return (
    <Layout>
        <SingleAppointment booking={booking} offices={offices}/>
        <NewBookingCalendar booking={booking}/>
    </Layout>
  )
}

export default SingleAppointmentPage