import React, { useLayoutEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../store/slices/themeSlice";

const COMMANDS = {
  CHANGE_THEME: "change-theme",
  GO_TO_SIGN_IN: "sign-in",
  GO_TO_SIGN_UP: "sign-up",
};

const useVoiceAI = () => {
  const [alanInstance, setAlanInstance] = useState(null);
  const [redirect, setRedirect] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeApi.theme);
  const currentTheme = theme === "dark" ? "navy-blue" : "dark";
  const alanRef = useRef(null);

  const switchTheme = (e) => {
    dispatch(changeTheme({ theme: currentTheme }));
  };

  const handleRedirect = (e) => {
    // console.log(e, "redrect event")
    const { detail: url } = e;
    setRedirect(url);
  };
  useLayoutEffect(() => {
    document.addEventListener(COMMANDS.GO_TO_SIGN_UP, handleRedirect);
    document.addEventListener(COMMANDS.GO_TO_SIGN_IN, handleRedirect);
    document.addEventListener(COMMANDS.CHANGE_THEME, switchTheme);

    return () => {
      document.removeEventListener(COMMANDS.GO_TO_SIGN_UP, handleRedirect);
      document.removeEventListener(COMMANDS.GO_TO_SIGN_IN, handleRedirect);
      document.removeEventListener(COMMANDS.CHANGE_THEME, switchTheme);
    };
  }, [theme, redirect]);

  const dispatchCommand = (command) => {
    if (command === COMMANDS.CHANGE_THEME) {
      const customEvent = new CustomEvent(COMMANDS.CHANGE_THEME, {
        // detail: payload,
      });
      document.dispatchEvent(customEvent);
    }

    if (command === COMMANDS.GO_TO_SIGN_IN) {
      const customEvent = new CustomEvent(COMMANDS.GO_TO_SIGN_IN, {
        detail: `signin`,
        // detail: `${window.location.href}signin`,
      });
      document.dispatchEvent(customEvent);
    }

    if (command === COMMANDS.GO_TO_SIGN_UP) {
      const customEvent = new CustomEvent(COMMANDS.GO_TO_SIGN_UP, {
        detail: `signup`,
        // detail: `${window.location.href}signup`,
      });
      document.dispatchEvent(customEvent);
    }
  };


  useLayoutEffect(() => {
    const createAlan = () => {
      alanBtn({
        top: "20px",
        left: "20px",
        key: process.env.REACT_APP_ALAN_SDK_KEY,
        rootEl: document.getElementById("alan-btn"),
        onCommand: ({ command }) => {
          dispatchCommand(command);
        },
      });

      console.clear();
    };

    requestAnimationFrame(createAlan);
  }, []);

  return (
    <div id="alan-btn" ref={alanRef}>
      {redirect !== "" && <Redirect to={`/${redirect}`} />}
    </div>
  );
};
export default useVoiceAI;
