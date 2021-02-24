import React from 'react';

const Event = (props) => {
  const schedule = props.event;
  console.log(schedule)
  function getTime(hour, mins) {
    let day = "AM";
    if (hour > 12) {
      hour = hour - 12;
      day = "PM";
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    return `${hour}:${mins} ${day}`
  }

  const startTime = getTime(schedule.startTime.hour,schedule.startTime.mins)
  const endTime = getTime(schedule.endTime.hour,schedule.endTime.mins)
  return (
    <div id="eventCard">
      <b>{schedule.summary}</b><br/>
      <i>{startTime} - {endTime}</i>
    </div>
  )
}

export default Event;