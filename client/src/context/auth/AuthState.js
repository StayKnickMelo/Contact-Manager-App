import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT
}
  from '../types';

const AuthState = (props) => {


  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {

    if(localStorage.getItem('token')){
      setAuthToken(localStorage.getItem('token'));
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })

    }catch(err){

      dispatch({
        type: AUTH_ERROR
      })

    }

  }

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();

    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })

    }
  }


  // Login User
  const logIn = async (user) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    
    try {

      const res = await axios.post('api/auth', user, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      loadUser()

    } catch (err) {

      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg        
      })


    }

  }

  // Logout
  const logOut = ()=> {
    dispatch({
      type: LOGOUT
    });
  }

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  }




  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        logIn,
        loadUser,
        clearErrors,
        logOut

      }}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthState;