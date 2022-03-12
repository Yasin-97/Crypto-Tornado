import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeTheme} from 'store/slices/themeSlice'

export default function ThemeToggle({closeMenu}) {

  const dispatch=useDispatch()
  const theme=useSelector((state)=>state.themeApi.theme)


const currentTheme=theme=="dark"?'navy-blue':'dark'

const toggle=()=>{
  dispatch(changeTheme({ theme:currentTheme }));
  setTimeout(() => {
    closeMenu()
    
  }, 190);
}

  return (
    <label className="switch">
      <input
        type="checkbox"
        defaultValue={false}
        onClick={toggle}
        id="toggleBtn"
        role='toggle-btn'
      />
      <span className="slider round"></span>
    </label>

  );
}