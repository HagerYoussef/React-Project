import { createContext, useState, useEffect } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
    let [userToken, setToken] = useState(localStorage.getItem('userToken'));
    useEffect(() => {
        function handleTokenChange() {
          setToken(localStorage.getItem("userToken"));
        }
      
        window.addEventListener("storage", handleTokenChange); // استماع لتغيرات localStorage
      
        return () => {
          window.removeEventListener("storage", handleTokenChange);
        };
      }, []);
      
    return (
        <userContext.Provider value={{ userToken, setToken }}>
            {props.children}
        </userContext.Provider>
    );
}
