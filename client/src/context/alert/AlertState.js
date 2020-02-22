import React,  {useReducer} from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import uuid from 'uuid';



const AlertState = (props)=> {

  // const initalState = {
  //   alerts: [],
  //   errorInput: null
  // }

  const initalState = {
    alerts: null,
    errorInput: null

  }


  const [state, dispatch] = useReducer(alertReducer, initalState);

  // Set Alert 

  const setAlert = (msg, type)=> {


    dispatch({
      type: SET_ALERT,
      payload: {msg, type}
    });


    
    setTimeout(()=> {
      dispatch({
        type: REMOVE_ALERT,
      })
    }, 3000);

  }

  return (
    <AlertContext.Provider
    value={{
      alerts: state.alerts,
      errorInput: state.errorInput,
      setAlert
    }}>
      {props.children}
    </AlertContext.Provider>

  )
}

export default AlertState;