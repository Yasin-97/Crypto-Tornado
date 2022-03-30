import React,{useEffect,useRef,useState} from "react";
import alanBtn  from "@alan-ai/alan-sdk-web";

const useVoiceAI = () => {
    const [alanBtnInstance ,setAlanBtnInstance] = useState()
    //AI-ASSISTANCE
//   const alanBtnInstance = useRef(null);

    useEffect(() => {
        if(alanBtnInstance !== null) return ;
        // if (!alanBtnInstance.current) {
        //     alanBtnInstance.current = 
        // }

        setAlanBtnInstance(
            alanBtn({
                top:"15px",
                left:"15px",
                key: process.env.ALAN_KEY,
                    onCommand: (commandData) => {
                        console.log(commandData)
                        if (commandData.command === 'go:back') {
                        // Call the client code that will react to the received command
                        }
                    }
            }) 
            )
    }, []);


    return null;
}
export default useVoiceAI;