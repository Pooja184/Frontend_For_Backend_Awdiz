import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const navigate=useNavigate();
  const [userInfo,setUserInfo]=useState({
    name:"",
    email:"",
    password:""
  })
  // const [formData,setFormData]=useState([])
  const handleChange=(e)=>{
    // console.log({[e.target.name]:e.target.value})
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
    // console.log(userInfo)
  }

  const handleSubmit=async()=>{
   try {
     if (!userInfo.name || !userInfo.email || !userInfo.password) {
       alert("Please fill in all required fields");
       return;
     }
     
       const response = await axios.post("http://localhost:8000/api/v1/auth/register", 
         userInfo,
       );
     console.log(response.data);
       if (response.data) {
         alert("Registration successful!");
         navigate('/login');
       }
     setUserInfo({
       name: "",
       email: "",
       password: ""
     })
   } catch (error) {
        if (error.response) {
         
          alert(error.response.data.message || "Registration failed. Please try again.");
          console.log("Error data:", error.response.data);
        } 
   }
  }
  return (
  <div>
      <h1>Hello, {`${userInfo.name}`}</h1>

      <div className='flex justify-center items-center  '>
      <div className=' border-4 border-black p-10 bg-red-400 '>
        <div className='text-left mt-2'>
          <label htmlFor="name">Name</label><br />
        <input onChange={handleChange} className='outline-none ' type="text" name="name" value={userInfo.name} id="name" /><br />
        </div>
        <div className='text-left mt-2'>
          <label htmlFor="Username">email</label><br />
        <input onChange={handleChange} className='outline-none' type="email" name="email" value={userInfo.email} id="email" /><br />
        </div>
        <div className='text-left mt-2'>
            <label htmlFor="password">Password</label><br />
        <input onChange={handleChange} className='outline-none' type="text" name="password" value={userInfo.password} id="password" /><br />
        </div>
       <button onClick={handleSubmit} className='bg-green-700 px-4 py-2 mt-2'>Submit</button>
      </div>
    </div>
  </div>
  )
}

export default Register
