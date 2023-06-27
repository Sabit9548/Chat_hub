import React from "react";
import { useState } from "react";
import axios from "axios";
//import Add from "../img/addAvatar.png"
import { Link } from "react-router-dom";

const Login = () =>{

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			console.log(res.data)
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


    return (
        <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatHub</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input 
              required 
              type="email" 
              placeholder="email" 
              name="email"
			  onChange={handleChange}
			  value={data.email}
			/>
          <input 
            required 
            type="password" 
            placeholder="password"
            name="password"
			onChange={handleChange}
			value={data.password}
          />
          {error && <div>{error}</div>}
          <button type="submit">Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    )
}
export default Login;