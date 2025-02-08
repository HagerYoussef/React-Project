import { createContext } from "react";

export let counterContext=createContext();
export default function CounterContextProvider(props){
    let x=9;
    let y=7;
    return <counterContext.Provider value={{x,y}}>
       {props.children}
    </counterContext.Provider>
}