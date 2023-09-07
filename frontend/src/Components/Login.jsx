import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import useAuth from "../Hook/useAuth";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    // if (username.trim() == "") {
    //   toast.error("Username is Requied.");
    // } else if (password.trim() == "") {
    //   toast.error("Password Is Required.");
    // } else {
    try {
      const { data } = await axios.post("/api/v1/users/login-user", {
        username,
        password,
      });

      setCurrentUser(data);

      if (data) {
        navigate("/");
      }
    } catch (err) {
      console.log("ERROR AT LOGIN USER PAGE, ", err);
      toast.error(err.response.data.message);
    }
    //}
  };
  return (
    <div className="fixed top-0 h-full left-0 right-0 bg-[#F3F4F6]">
      <div className="flex justify-center items-center px-8 py-32 lg:py-48">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="" className="font-bold">
                Username <span className="text-gray-500">*</span>
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="username"
                placeholder="Enter Username"
                className="w-full bg-white shadow p-3 rounded-md outline-none mt-2 focus:bg-slate-100"
              />
            </div>

            <div className="relative form-group mt-4">
              <label htmlFor="" className="font-bold">
                Password <span className="text-gray-500">*</span>
              </label>

              <input
                type={showPassword}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                className="w-full bg-white shadow p-3 rounded-md outline-none mt-2 focus:bg-slate-100"
              />
              {showPassword == "password" ? (
                <AiFillEye
                  onClick={() => setShowPassword("")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("password")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              )}
            </div>

            <div className="form-group mt-6">
              <button
                type="submit"
                className="bg-green-900 w-full p-3 rounded-md text-center text-white hover:bg-green-800"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center mt-4">
            <p>
              I don't have account ||{" "}
              <Link
                to="/signup"
                className="text-green-600 font-bold text-center"
              >
                Sign Up
              </Link>
            </p>
            <Link to="/forget-password" className="text-green-600 font-bold">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
