export const getPercentage = (start: number, end: number) => {
  return ((start / end) * 100).toFixed(2);
}

export const msToTime = (duration_ms: number) => {
  const seconds = Math.floor((duration_ms / 1000) % 60),
    minutes = Math.floor((duration_ms / (1000 * 60)) % 60),
    hours = Math.floor((duration_ms / (1000 * 60 * 60)) % 24);

  let hoursString = ``;

  const minutesStr = minutes.toString();
  const secondsStr = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString();
  
  const timeArr = [];
  if (hours && hours > 0) {
    hoursString = hours.toString();
    timeArr.push(hoursString)
  }
  timeArr.push(minutesStr);
  timeArr.push(secondsStr);

  return timeArr.join(':');
}