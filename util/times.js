export function timeToTwelve(timeTwentyFour) {

    let hour = timeTwentyFour.split(":")

    if (hour[0] < 13) {
        return timeTwentyFour + " AM"
    } else {
        let twelveHour = parseInt(hour[0]) - 12
        return twelveHour + ":" + hour[1] + " PM"
    }
}