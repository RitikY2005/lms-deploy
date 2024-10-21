import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'; 
import { isEmailValid, isPasswordValid } from "../Helpers/regExValidator";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/user.slice.js";

function Login(){
    
     const dispatch= useDispatch();
     const navigate= useNavigate();

     const [userInput,setUserInput]=useState({
        email:"",
        password:""
     });


    function handleInputChange(e){
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        });
    }
    
    async function onFormSubmit(e){
        e.preventDefault();
        
        // check if we have all the fields 

        if(!userInput.email || !userInput.password){
            toast.error('all fields are required!');
            return ;
        }

      
        // check if email is correct 
        if(!isEmailValid(userInput.email)){
            toast.error('Invalid Email ');
            return ;
        } 

     

        const data={
            email:userInput.email,
            password:userInput.password
        }
        
       
        const response= await dispatch(login(data));

        if(response?.payload?.success) navigate("/user/profile");

        setUserInput({
            email:"",
            password:""
        });

    }



   return (
      
        <HomeLayout>
            <div className="w-full h-[90vh] flex justify-center items-center text-white">
                <div className="w-96 py-10 px-7 shadow-[0px_0px_10px_black] flex flex-col items-center rounded justify-center space-y-2">
                      <h1 className="text-3xl font-bold">Log In </h1>
                      <p className="text-lg text-center">Get back to your studies !</p>
                      <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-start space-y-4 w-full">

                   


                        <div className="space-y-1">
                            <label htmlFor="email" className="block">Email:</label>
                            <input type="email" id="email" value={userInput.email} name="email" placeholder="enter your email address" onChange={handleInputChange} className="w-full py-2 px-3 rounded outline-none"/>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="block">Password:</label>
                            <input type="password" id="password" value={userInput.password} name="password" placeholder="enter your password" onChange={handleInputChange} className="w-full py-2 px-3 rounded outline-none"/>
                        </div>

                        <div>
                            <Link to="/forgot-password" className="link text-sky-600 visited:text-purple-600">Forgot password ?</Link>
                        </div>

                        <button type="submit" className="w-full text-center py-1 bg-yellow-500 text-white text-md font-bold rounded-sm" >
                            Login
                        </button>

                        <div className="w-full text-sm text-left ">
                            Don't have an account? <Link to="/signin" className="link text-sky-600 visited:text-purple-600">Create an account</Link>
                        </div>
                      </form>
                </div>
            </div>
        </HomeLayout>

   )
}

export default Login;