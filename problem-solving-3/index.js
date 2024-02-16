// Problem Solving Basic 3

const convertTo24HourFormat = (time) => {
  const [timePart, meridiem] = time.split(/(?=[AP]M)/);

  let [hours, minutes, seconds] = timePart.split(":");
  
  hours = parseInt(hours);

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  if (hours > 24 && meridiem === 'PM') {
    return 'Invalid Date'
  } else if (hours > 12 && meridiem === 'AM') {
    return 'Invalid Date'
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
}

const time = "12:01:00AM";
const convertedTime = convertTo24HourFormat(time);

console.log(convertedTime);
