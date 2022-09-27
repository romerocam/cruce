import connectMongo from "../../../../../../util/dbConnect";
import Office from "../../../../../../models/Office";
import Booking from "../../../../../../models/Booking";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const officeId = req.query.id;
  const monthId = Number(req.query.month);
  const yearId = Number(req.query.year);

  console.log(officeId, "officeId");
  console.log(monthId, "monthId");
  console.log(yearId, "yearId");

  await connectMongo();

  switch (method) {
    case "GET":
      try {
        // Query to obtain the timeRange and capacity per selected office:
        const officeData = await Office.findOne(
          { _id: officeId },
          "timeRange capacityPerSlot"
        );

        // Generate an array of objects with 2 properties: time of the slot and capacity.
        // *** Declare variables
        const capacity = officeData.capacityPerSlot;

        let fromHour = parseInt(officeData.timeRange.from.split(":")[0]);
        let fromMinute = parseInt(officeData.timeRange.from.split(":")[1]);

        let toHour = parseInt(officeData.timeRange.to.split(":")[0]);
        let toMinute = parseInt(officeData.timeRange.to.split(":")[1]);

        // *** Count number of slots (considering that the appointments last 15 minutes)
        let slotsCount;
        if (fromHour === toHour) {
          slotsCount = (toMinute - fromMinute) / 15;
        } else {
          slotsCount = (toHour - fromHour) * 4 + (toMinute - fromMinute) / 15;
        }

        // *** Store the data of the office (maxCapacity and time of the slots) in individual objects inside of an array
        let officeDataArr = [];
        for (let index = 0; index < slotsCount; index++) {
          officeDataArr.push({
            capacity: capacity,
            time: `${fromHour<10?"0"+fromHour:fromHour}:${fromMinute ? fromMinute : "00"}`,
          });
          if (fromMinute === 45) {
            fromMinute = 0;
            fromHour += 1;
          } else {
            fromMinute += 15;
          }
        }

        // *** Determine whether we are searching for slots during the current month or in future months.
        // In case we are searching for slots in the current month, determine the date
        // of the month (this is because we only care about the future days).
        // If today is September 18th, we will just care about the slots from September
        // 18th until September 31st, but we won't care about the slots from September 1st until September 17th.
        let daysInMonth = new Date(yearId, monthId, 0).getDate();

        let initDay = 1;

        let currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (yearId === currentYear && monthId === currentMonth) {
          let currentDay = currentDate.getDate();
          initDay = currentDay;
        }

        console.log("currentYear", currentYear);
        console.log("currentMonth", currentMonth);

        let officeDataArrPerDay = [];
        for (initDay; initDay <= daysInMonth; initDay++) {
          if (
            new Date(yearId, monthId - 1, initDay).getDay() !== 6 &&
            new Date(yearId, monthId - 1, initDay).getDay() !== 0 &&
            new Date(yearId, monthId - 1, initDay)>currentDate
          ) {
            console.log(new Date(yearId, monthId - 1, initDay).getDay(), "día");
            console.log(new Date(yearId, monthId - 1, initDay), "fecha entera");

            officeDataArrPerDay.push({
              day: initDay,
              slots: JSON.parse(
                JSON.stringify(officeDataArr)
              ) /*officeDataArr.slice()*/ /*[...officeDataArr]*/,
            });
          }
        }

        // Query to obtain the booked slots per office, year and month:
        const bookedSlots = await Booking.aggregate([
          {
            $project: {
              year: { $year: "$date" },
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" },
              date: 1,
              office: 1,
              startAt: 1,
            },
          },
          {
            $match: {
              office: ObjectId(officeId),
              year: yearId,
              month: monthId,
            },
          },
          {
            $group: {
              _id: {
                day: "$day",
                startAt: "$startAt",
              },
              count: { $sum: 1 },
            },
          },
        ]);
       
        
        // Logic to obtain remaining slots available
        let availableSlots = JSON.parse(JSON.stringify(officeDataArrPerDay)); //We need to copy the array/objects this way because there are nested elements and then we get a shallow copy otherwise. What we need is a deep copy.
        /* This was another way of getting the remaining slots but not so efficient and more difficult to delete the zero value objects inside it.
        availableSlots.forEach((elementAS) => {
          bookedSlots.forEach((elementBS) => {
            if (elementBS._id.day === elementAS.day) {
              elementAS.slots.forEach((elementASSlots) => {
                if (elementBS._id.startAt === elementASSlots.time) {
                  elementASSlots.capacity =
                    elementASSlots.capacity - elementBS.count;
                }
              });
            }
          });
        });
        */

        bookedSlots.forEach((bookedSlot) => {
          let daySlots = availableSlots.find(
            (x) => x.day === bookedSlot._id.day
          );
          if (!daySlots) return;

          let slot = daySlots.slots.find(
            (x) => x.time === bookedSlot._id.startAt
          );
          if (!slot) return;

          slot.capacity -= bookedSlot.count;

          if (slot.capacity === 0) {
            let index = daySlots.slots.indexOf(slot);
            daySlots.slots.splice(index, 1);
          }
          if (!daySlots.slots.length) {
            let index = availableSlots.indexOf(daySlots);
            availableSlots.splice(index, 1);
          }
        });

        console.log(officeDataArr, "officeDataArray");
        console.log(bookedSlots, "bookedSlots");
        console.log(JSON.stringify(availableSlots), "availableSlots");
        console.log(JSON.stringify(officeDataArrPerDay), "officeDataArrPerDay");

        res.status(200).json({
          success: true,
          data: availableSlots,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
