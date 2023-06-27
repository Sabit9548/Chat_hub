import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Add from "../img/addAvatar.png";

const Register = () =>{
  const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required 
              type="text" 
              placeholder="username" 
              name="username"
							onChange={handleChange}
							value={data.username} 
          />
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
          <input style={{display:"none"}} type="file" id="file" name="file"/>
          <label htmlFor="file">
            <img src={Add} alt=""/>
            <span>Add an avatar</span>
          </label>
          {error && <div>{error}</div>}
          <button type="submit">Sign up</button>
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    )
}
export default Register;