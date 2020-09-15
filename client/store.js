import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

//or move to seperate reducer js file for large redux store operation
//Use connect for dipatch and state
function reducer (state = {}, action) {
  switch (action.type) {
    default: 
    return state
  }
}

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);