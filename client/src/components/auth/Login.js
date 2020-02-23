import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'



const Login = (props) => {

  const authContext = useContext(AuthContext);
  const { logIn, isAuthenticated, error, clearErrors, } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert,  errorInput } = alertContext

  const [user, setUser] = useState({
    email: '',
    password: ''
  });


  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history, error])

 

  const { email, password } = user;

  const onChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });

  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Fill in the fileds', 'danger')
    } else {

      logIn({
        email: email.toLowerCase(),
        password
      })
    }

    setUser({
      email: '',
      password: ''
    })

  }


  return (
    <form onSubmit={onSubmit} className="card">
      <h2 className="text-center text-success">Login</h2>
      <label htmlFor="email">Email</label>
      <input className={errorInput && 'error'} value={email} onChange={onChange} type="text" name="email" placeholder={errorInput && 'Enter Email'} />
      <label htmlFor="password">Password</label>
      <input className={errorInput && 'error'} value={password} onChange={onChange} type="password" name="password" placeholder={errorInput && 'Enter Password'}/>
      <input type="submit" value="Log In" className="btn btn-block btn-form" />
    </form>
  )
}

export default Login
