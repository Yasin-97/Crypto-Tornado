import React, { useEffect, useRef, useState } from "react";
import {navigation} from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/slices/themeSlice";
import EventEmitter from "./event-emitter";



const useVoiceAI = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeApi.theme);
  const customEvent = new EventEmitter();
  const currentTheme = theme === "dark" ? "navy-blue" : "dark";
  const alanBtnInstance = useRef(null);

  const switchTheme = () => {
    // console.log(
    //     `%c ${theme} theme`,
    //     "background:orange; color:black;padding: 2px; border-radius:2px;"
    //     );
        dispatch(changeTheme({ theme: currentTheme }));
        customEvent.off("changeTheme");
  };

  customEvent.on("changeTheme",switchTheme)
  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        top: "20px",
        left: "20px",
        rootEl: alanBtnInstance.current,

        key: process.env.REACT_APP_ALAN_SDK_KEY,

        onCommand: ({ command }) => {
        //   console.log(command, "command dispatched");
        //   console.log(
        //     `%c [${command}]`,
        //     "background:blue; color: deeppink;padding: 6px; border-radius:2px"
        //   );
          if (command === "change-theme") {
            customEvent.dispatch("changeTheme");
          }
        },
      });
    }else{
        alanBtnInstance.current = null;
        alanBtnInstance.current = alanBtn({
            top: "20px",
            left: "20px",
            rootEl: alanBtnInstance.current,
    
            key: process.env.REACT_APP_ALAN_SDK_KEY,
    
            onCommand: ({ command }) => {
              console.log(command, "command dispatched");
              console.log(
                `%c [${command}]`,
                "background:blue; color: deeppink;padding: 6px; border-radius:2px"
              );
              console.log(
                `%c [${theme}]`,
                "background:green; color:black;padding: 2px; border-radius:2px;"
              );
              if (command === "change-theme") {
                customEvent.dispatch("changeTheme");
              }
            },
          });

    }


    return () => {
        alanBtnInstance.current.remove();
    }
  }, [theme]);



  return (
    <div className="alan-btn" id="alan-btn" ref={alanBtnInstance}>
    </div>
  );
};
export default useVoiceAI;
