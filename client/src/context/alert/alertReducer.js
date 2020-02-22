import {
SET_ALERT,
REMOVE_ALERT
} from  '../types'


const alertReducer = (state, action) => {
  switch(action.type){
    case SET_ALERT:
      return {
        ...state,
        // alerts: [...state.alerts, action.payload],
        alerts: action.payload,
        errorInput: true
      }
    case REMOVE_ALERT:
      return {
        ...state,
        // alerts: state.alerts.filter(alert => alert.id !== action.payload ),
        alerts: null,
        errorInput: null
      }
    default:
      return state
  }
}


export default alertReducer;