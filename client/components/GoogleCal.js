import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Event from "./Event"

const GoogleCal = () => {
  let [todayEvents, setTodayEvents] = useState([]);
  let [upcomingEvents, setUpcomingEvents] = useState([]);

  // let todayEvents = [];
  // let upcomingEvents = [];

  async function fetchEvents () {
    await axios.get('/api/loggedIn').then(
      (res) => {
        console.log('axios fetch', res.data)
        setTodayEvents([...res.data[0]]);
        setUpcomingEvents(res.data[1])
      }
    )
  }

  useEffect(() => {
    console.log('here in useEffect')
    fetchEvents();
  }, [])
  
  useEffect(() => {
    console.log('updating the events')
  },[todayEvents, upcomingEvents])

  return (
    <div id="googleCal">
      <button onClick={() => fetchEvents()}></button>
      <div id="todayEvents">
        <h3>Today</h3>
        {
          todayEvents ? todayEvents.map((event, index) => (
            <Event key={index} event={event} />
          )) : <h4>No Events Today</h4>
        }
      </div>
      <div id="upcomingEvents">
        <h3>Upcoming</h3>
        {
          upcomingEvents ? upcomingEvents.map((event, index) =>
            (
            <Event key={index} event={event} />
            ))
            : <h4>No Upcoming Events</h4>
        }
      </div>
    </div>
  )
}

export default GoogleCal;