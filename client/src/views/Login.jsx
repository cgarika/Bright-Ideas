import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { userContext } from '../context/userContext';


const Login = (props) => {
  const {errors, errorUpdater} = props;

  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate();

  // Single-state object for login data
  const [loginData, setLoginData] = useState(
    {
      email: '',
      password: ''
    });

  // Single-state object for registration data
  const [registerData, setRegisterData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  )

    // SINGLE-STATE OBJECT for the form errors needed for front end validation
    const [regErrors, setRegErrors] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    const [loginErrors, setLoginErrors] = useState({
      email: "",
      password: ""
    });
  
  

    const firstNameHandler = (e) => {
      const value = e.target.value;
      let errorMsg = '';
        if (value) {
          if (value.length < 2) {
            errorMsg = "First name must be at least 2 characters long";
          } else if (value.length > 40) {
            errorMsg = "First name cannot exceed 40 characters!";
          }
        } else {
          errorMsg = "First name is required!"
        }
        setRegisterData((prevRegisterData) => ({...prevRegisterData, firstName: value}));
        setRegErrors((prevRegErrors) => ({...prevRegErrors, firstName: errorMsg}))
    }

    const lastNameHandler = (e) => {
      const value = e.target.value;
      let errorMsg = '';
        if (value) {
          if (value.length < 2) {
            errorMsg = "Last name must be at least 2 characters long";
          } else if (value.length > 40) {
            errorMsg = "Last name cannot exceed 40 characters!";
          }
        } else {
          errorMsg = "Last name is required!"
        }
        setRegisterData((prevRegisterData) => ({...prevRegisterData, lastName: value}));
        setRegErrors((prevRegErrors) => ({...prevRegErrors, lastName: errorMsg}))
    }

    const emailHandler = (e, isLogin = false) => {
      const value = e.target.value;
      let errorMsg = '';
      if (!value) {
        errorMsg = "Email is required!";
      }
      if (isLogin) {
        setLoginData(prev => ({ ...prev, email: value }));
        setLoginErrors(prev => ({ ...prev, email: errorMsg }));
      } else {
        setRegisterData(prev => ({ ...prev, email: value }));
        setRegErrors(prev => ({ ...prev, email: errorMsg }));
      }
    };

    const passwordHandler = (e, isLogin = false) => {
      const value = e.target.value;
      let errorMsg = '';
      
      if (!value) {
        errorMsg = "Password is required!";
      } else if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters long.";
      } else if (value.length > 40) {
        errorMsg = "Password cannot exceed 40 characters!";
      }
      if (isLogin) {
        setLoginData(prev => ({ ...prev, password: value }));
        setLoginErrors(prev => ({ ...prev, password: errorMsg }));
      } else {
        setRegisterData(prev => ({ ...prev, password: value }));
        setRegErrors(prev => ({ ...prev, password: errorMsg }));
      }
    };

    const confirmPasswordHandler = (e) => {
      const value = e.target.value;
      let errorMsg = '';
  
      if (value !== registerData.password) {
        errorMsg = "Passwords do not match!";
      }
  
      setRegisterData((prevRegisterData) => ({...prevRegisterData, confirmPassword: value}));
      setRegErrors((prevRegErrors) => ({...prevRegErrors, confirmPassword: errorMsg}));
    };

    const registrationHandler = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/api/register", registerData, {withCredentials: true});
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate("/bright_ideas");
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/login', loginData, {withCredentials: true});
        if (response.data.msg === "Login successful!") {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/bright_ideas');
          setLoginData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        }
      } catch (err) {
        setLoginErrors(err.response.data.errors || {message: "Login failed"});
      }
    };



  return (
    <div className="main-body__login">
      <div className="main-body__login-content">
        <div className="form-wrapper">
          <div className="form-wrapper__top">
            <h3>Register</h3>
          </div>
          <div>
            <form onSubmit={registrationHandler} className="form-body" >
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" id="firstName" value={registerData.firstName} onChange={firstNameHandler} />
              {regErrors.firstName && <p style={{color:"red"}} >{regErrors.firstName}</p>}
              {errors.firstName && <p style={{color:"red"}} >{errors.firstName.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" name="lastName" id="lastName" value={registerData.lastName} onChange={lastNameHandler} />
              {regErrors.lastName && <p style={{color:"red"}} >{regErrors.lastName}</p>}
              {errors.lastName && <p style={{color:"red"}} >{errors.lastName.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" value={registerData.email} onChange={emailHandler} />
              {regErrors.email && <p style={{color:"red"}} >{regErrors.email}</p>}
              {errors.email && <p style={{color:"red"}} >{errors.email.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" value={registerData.password} onChange={passwordHandler} />
              {regErrors.password && <p style={{color:"red"}} >{regErrors.password}</p>}
              {errors.password && <p style={{color:"red"}} >{errors.password.message}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="confirmPassword" value={registerData.confirmPassword} onChange={confirmPasswordHandler} />
              {regErrors.confirmPassword && <p style={{color:"red"}} >{regErrors.confirmPassword}</p>}
              {errors.confirmPassword && <p style={{color:"red"}} >{errors.confirmPassword.message}</p>}
            </div>
              <div className="form-button__wrapper">
                <Button type='submit' variant='primary'>Register</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="form-wrapper">
            <div className="form-wrapper__top">
              <h3>Login</h3>
            </div>
            <div>
              <form onSubmit={registrationHandler} className="form-body" >
                <div className="input-wrapper">
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" id="email" value={loginData.email} onChange={(e) => emailHandler(e, true)} />
                  {loginErrors.email && <p style={{color:"red"}} >{loginErrors.email}</p>}
                  {errors.email && <p style={{color:"red"}} >{errors.email.message}</p>}
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" id="password" value={loginData.password} onChange={(e) => passwordHandler(e, true)} />
                  {loginErrors.password && <p style={{color:"red"}} >{loginErrors.password}</p>}
                  {errors.password && <p style={{color:"red"}} >{errors.password.message}</p>}
                </div>
                <div className="form-button__wrapper">
                  <Button type='submit' variant='primary' onClick={handleLogin}>Login</Button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  )

}

export default Login;