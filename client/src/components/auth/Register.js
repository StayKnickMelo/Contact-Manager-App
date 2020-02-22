import React, { useState, useContext, useEffect } from 'react';

// Contexts
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

  const alertContext = useContext(AlertContext);
  const { setAlert, errorInput } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {

    if (isAuthenticated) {
      props.history.push('/');

    }

    if (error === 'User Alredy Exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;


  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.password2) {
      // Set Alert

      setAlert(`Passwords dont't match`, 'danger');


    } else if (user === '' || email === '' || password === '' || password === '') {

      setAlert(`Please fill in all fields`, 'danger')

    } else {
      register({ name, email, password })

    }


    setUser({
      name: '',
      email: '',
      password: '',
      password2: ''
    });


  }


  return (
    <form onSubmit={onSubmit} className="card" >
      <h2 className="text-center">Register a New <span className="text-primary">User</span> </h2>
      <label htmlFor="name">Name</label>
      <input className={errorInput && 'error'} onChange={onChange} value={name} type="text" name="name" placeholder={errorInput && 'Enter Name'} />
      <label htmlFor="email">Email</label>
      <input className={errorInput && 'error'} onChange={onChange} value={email} type="email" name="email" placeholder={errorInput && 'Enter Email'} />
      <label htmlFor="password">Password</label>
      <input className={errorInput && 'error'} onChange={onChange} value={password} type="password" name="password" placeholder={errorInput && 'Enter Password'} minLength='6' />
      <label className={errorInput && 'error'} htmlFor="password2">Confirm Password</label>
      <input className={errorInput && 'error'} onChange={onChange} value={password2} type="password" name="password2" placeholder={errorInput && 'Confirm Password'} minLength='6' />
      <input type="submit" value="Register" className="btn btn-block btn-danger" />
    </form>
  )
}

export default Register