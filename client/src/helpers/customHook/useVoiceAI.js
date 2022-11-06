import React, { useCallback, useEffect, useRef, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../store/slices/themeSlice";

const COMMANDS = {
  CHANGE_THEME: "changeTheme",
};

const useVoiceAI = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeApi.theme);
  const currentTheme = theme === "dark" ? "navy-blue" : "dark";
  const alanRef = useRef(null);

  const switchTheme = (e) => {
    dispatch(changeTheme({ theme: currentTheme }));
  };

  useEffect(() => {
    document.addEventListener(COMMANDS.CHANGE_THEME, switchTheme);

    return () => {
      document.removeEventListener(COMMANDS.CHANGE_THEME, switchTheme);
    };
  }, [theme]);

  useEffect(() => {
    if (!alanRef.current) {
      alanRef.current = alanBtn({
        top: "20px",
        left: "20px",
        key: process.env.REACT_APP_ALAN_SDK_KEY,
        rootEl: document.getElementById("alan-btn"),
        onCommand: ({ command, payload }) => {
          console.log(command, "[command]");

          if (command === "change-theme") {
            const customEvent = new CustomEvent(COMMANDS.CHANGE_THEME, {
              // detail: payload,
            });
            document.dispatchEvent(customEvent);
          }
        },
      });
    } else {
      alanRef.current.remove();
      alanRef.current = null;
      alanRef.current = alanBtn({
        top: "20px",
        left: "20px",
        key: process.env.REACT_APP_ALAN_SDK_KEY,
        rootEl: document.getElementById("alan-btn"),
        onCommand: ({ command, payload }) => {
          console.log(command, "[command]");

          if (command === "change-theme") {
            const customEvent = new CustomEvent(COMMANDS.CHANGE_THEME, {
              detail: payload,
            });
            document.dispatchEvent(customEvent);
          }
        },
      });
    }
  }, [theme]);

  return <div id="alan-btn" ref={alanRef}></div>;
};
export default useVoiceAI;
