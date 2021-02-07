const app = require('./server/app')
const { db }= require('./server/db')

//port of environment or local port
const PORT = process.env.PORT || 1200;

// db sync then load server
// db.sync({ force: true })
//   .then(() => {
//     app.listen(PORT, function() {
//       console.log(`listening on port ${PORT}`)
//     })  
//   }
// )

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`)
})  