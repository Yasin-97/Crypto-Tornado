// import React, { useEffect, useRef, useState } from "react";
// import "../assets/css/forms-main.min.css";
// import SignInSVG from "../assets/img/log.svg";
// import PersonIcon from '@material-ui/icons/Person';
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import {Link,useHistory} from 'react-router-dom'
// import {useAuth} from '../context/authContext'

// export default function SignIn() {
//   // refs
//   const sectionRef = useRef();
//   const emailRef=useRef();
//   const passwordRef= useRef();

//   //state
//   const [loading,setLoading]=useState('')
//   const [error,setError]=useState(false)

//   //hooks
//   const {login}=useAuth()
//   const history=useHistory()

//   //functions
//   async function handleSubmit(e){
//     e.preventDefault()
    
//     try{
//       setError('')
//       setLoading(true)
//       await login(emailRef.current.value,passwordRef.current.value)
//       history.push('/admin/dashboard')
//     }catch(err){
//       console.log(err);
//       setError(err.message)
//     }
//     setLoading(false)
//   }


//   useEffect(() => {
//     sectionRef.current.className += " animate";
//   }, []);

//   return (
//     <section ref={sectionRef}>
      
//       <div className="form__container">
//          <div className="otherAction">
//           <div className="otherAction__desc">
//             <h4 className="otherAction__title">new one ?</h4>
//             <p className="otherAction__text">
//               Just go ahead and become one of us !
//             </p>
//             <Link to="/signup" className=" otherAction__btn">Sign Up</Link>
//           </div>
//           <div className="otherAction__img__container">
//             <img
//               src={SignInSVG}
//               alt="signin-rocket-svg"
//               className="otherAction__img"
//             />
//           </div>
//         </div>
//         <form className="form" onSubmit={handleSubmit}>
//           <h3 className="form__title">SIGN IN</h3>
//           <div className="form__input__group">
//           { error&&<b className="form__alert__danger">
//             {error}</b>}
//           </div>
//           <div className="form__input__group">
//             <label className="form__input__label">Email</label>
//             <div className="form__input__wrapper">
//               <PersonIcon style={{color:"#767676",fontSize:'20px'}} />
//               <input
//                 type="email"
//                 ref={emailRef}
//                 className="form__input"
//                 placeholder="Enter your email"
//                 autoComplete="false"
//               />
//             </div>
//           </div>

//           <div className="form__input__group">
//             <label className="form__input__label">Password</label>
//             <div className="form__input__wrapper">
//               <VpnKeyIcon style={{color:"#767676",fontSize:'20px'}} />
//               <input
//                 type="password"
//                 ref={passwordRef}
//                 className="form__input"
//                 placeholder="Enter your password"
//                 autoComplete="false"
//               />
//             </div>
//           </div>
//           <button className="form__btn">LET'S GO</button>
//           <div className="form__other__option">
//             <Link className="link" to="/forgot-password">Forgot your Password?</Link>
//           </div>
//         </form>
//       </div>  
//     </section>
//   );
// }