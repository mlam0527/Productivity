const router = require('express').Router();
const { getGoogleCal } = require('./googleCal');

//define express routes
router.get('/', async (req, res, next) => {
  try {
    await getGoogleCal().then((data) => {
      let today = [];
      let upcoming = [];
      let currentDay = new Date(Date.now()).getDate();
      for (let i = 0; i < data.length; i++) {
        const event = data[i];
        const startDate = new Date(event.startTime);
        const endDate = new Date(event.endTime)
        const day = startDate.getDate();
        const start = {
          month: startDate.getMonth(),
          day: day,
          hour: startDate.getHours(),
          mins: startDate.getMinutes()
        }
        const end = {
          month: endDate.getMonth(),
          day: endDate.getDate(),
          hour: endDate.getHours(),
          mins: endDate.getMinutes(),
        }
        event.startTime = start;
        event.endTime = end;
        if (currentDay === day) {
          today.push(event)
        } else {
          upcoming.push(event)
        }
      }
      res.send([today, upcoming])
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router;