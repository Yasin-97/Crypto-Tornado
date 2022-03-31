import React,{useEffect,useRef,useState} from "react";
import alanBtn  from "@alan-ai/alan-sdk-web";
import { useDispatch, useSelector } from "react-redux";
import {changeTheme} from "../../store/slices/themeSlice";

const useVoiceAI = () => {
    const [themeCheck,setThemeCheck] = useState("")
    const  dispatch = useDispatch();
    const theme = useSelector((state)=>state.themeApi.theme);
    const currentTheme = theme =="dark"? 'navy-blue':'dark'
    let alanBtnInstance = useRef(null);

    useEffect(() => {
        if (!alanBtnInstance.current) {
            alanBtnInstance.current = alanBtn({
                top:"20px",
                left:"20px",
                rootEl: document.getElementById("alan-btn"),

            key: process.env.REACT_APP_ALAN_AI_KEY,

            onCommand: ({command}) => {
                console.log(command,"[command]")
                if(command == "change-theme"){
                    setThemeCheck(currentTheme);
                    dispatch(changeTheme({ theme:currentTheme }));
                }

                
            }
            });
        }

    }, [currentTheme,theme,themeCheck]);


    return (
        <div className="alan-btn" id="alan-btn" ref={alanBtnInstance}>   </div>
    )
}
export default useVoiceAI;