import React, { useEffect, useRef,useState } from "react";
// import "../assets/css/forms-main.min.css";
// import SignUpSVG from "../assets/img/register.svg";
// import PersonIcon from '@material-ui/icons/Person';
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {useDispatch} from 'react-redux'
import {authActions} from '../authSlice'
import {Link,useHistory}from 'react-router-dom'
import {LockOutlined,UserOutlined,BankTwoTone, LockFilled} from "@ant-design/icons";
export default function SignUp() {
    const dispatch = useDispatch();
  //refs
  // const sectionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

//states
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)

//hooks
// const {signup,currentUser}=useAuth()
const history=useHistory()

//side effect
  // useEffect(() => {
  //   sectionRef.current.className += " animate";
  // }, []);
  
  //functions
  async function handleSubmit(e){
e.preventDefault();

if(passwordRef.current.value !== passwordConfirmRef.current.value){
  return setError('passwords do not match')
}

try{
  setError('')
  setLoading(true)
  await dispatch(authActions.signup(emailRef.current.value, passwordRef.current.value));
  history.push("/admin/dashboard")
}catch(error){
  setError(error.message)
}
setLoading(false)
  }



  return (
<section className='form__wrapper'>
        <form className="form" onSubmit={handleSubmit} >
          <h3 className="form__title">SIGN UP</h3>
          <div className="form__input__group">
          {error&& <b className="form__alert__danger">
            {error}</b>}
          </div>
          <div className="form__input__group">
            <label className="form__input__label">Email</label>
            <div className="form__input__wrapper">
              <UserOutlined className='form__icon' />
              <input
                type="email"
                ref={emailRef}
                className="form__input"
                placeholder="Enter your email"
                autoComplete="false"
              />
            </div>
          </div>

          <div className="form__input__group">
            <label className="form__input__label">Password</label>
            <div className="form__input__wrapper">
              <LockFilled className='form__icon' />
              <input
                type="password"
                ref={passwordRef}
                className="form__input"
                placeholder="Enter your password"
                autoComplete="false"
              />
            </div>
          </div>
          <div className="form__input__group">
            <label className="form__input__label">Password Confirmation</label>
            <div className="form__input__wrapper">
              <LockFilled className='form__icon' />
              <input
                type="password"
                ref={passwordConfirmRef}
                className="form__input"
                placeholder="Enter your password"
                autoComplete="false"
              />
            </div>
          </div>
          <button className="form__btn">LET'S GO</button>
        </form>
        </section>
  );
}