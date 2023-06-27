import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();
const user = localStorage.getItem("token");
axios.interceptors.request.use(
  config=>{
    config.headers.Authorization = user;
    return config;
  },
  error =>{
    return Promise.reject(error);
  }
);

export const AuthContextProvider = ({children})=> {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    //const result = axios.get('http://localhost:8000/api/profile');
      axios.get('http://localhost:8000/api/profile').then(response => {
      //console.log(response.data);
      setId(response.data._id);
      setUsername(response.data.username);
    });
      //setId(result.data.userId);
      //setUsername(result.data.username);
  }, []);
  return (
    <AuthContext.Provider value={{ username, setUsername,id ,setId}}>
      {children}
    </AuthContext.Provider>
  );
}