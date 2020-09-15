const app = require('./server/app')
const { db }= require('./server/db')

//port of environment or local port
const PORT = process.env.PORT || 213;

//db sync then load server
db.sync({ force: true })
  .then(() => {
    app.listen(PORT, function() {
      console.log(`listening on port ${PORT}`)
    })  
  }
)