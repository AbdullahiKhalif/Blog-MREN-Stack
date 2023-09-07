import axios from "axios";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();

  const handleSignupUser = async(event) => {
    event.preventDefault();
    try{
        const {data} = await axios.post('/api/v1/users/register-user', {username, email, password});
        //console.log(data)

        if(data){
            navigate('/signin')
        }

    }catch(err){
       // console.log("ERROR REGISTER USER: ", err);
        if(err.response.status == 404){
            toast.error(err.response.data)
        }
        else if (err.response.status == 500){
            toast.error(err.response.data.message)
        }
        else if (err.response.status == 400){
            toast.error(err.response.data.message)
        }

    }
  }
  return (
    <div className="fixed h-full top-0 left-0 right-0 bg-[#F3F4F6] overflow-y-auto">
      <div className="flex justify-center items-center px-8 py-32 lg:py-32">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <form onSubmit={handleSignupUser}>
            <div className="from-group">
              <label htmlFor="" className="font-semibold">
                Username <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-green-500"
                placeholder="Enter Your Username"
              />
            </div>

            <div className="from-group mt-4">
              <label htmlFor="" className="font-semibold">
                Email <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-green-500"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="relative from-group mt-4">
              <label htmlFor="" className="font-semibold">
                Password <span className="text-gray-500">*</span>
              </label>
              <input
                type={showPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-green-500"
                placeholder="Enter Your Email"
              />

              {showPassword == "password" ? (
                <AiFillEye
                  onClick={() => setShowPassword("")}
                  className="absolute top-11 right-5 text-xl"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("password")}
                  className="absolute top-11 right-5 text-xl"
                />
              )}
            </div>

            <div className="from-group mt-6">
              <button
                type="submit"
                className="w-full p-3 mt-1 outline-none rounded-md shadow-md bg-green-900 text-white hover:bg-green-800"
              >
                Register
              </button>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
                <p>I have already account || <Link to='/signin' className="text-green-600 font-bold">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
