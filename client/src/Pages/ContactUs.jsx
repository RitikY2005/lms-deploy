import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import toast from "react-hot-toast";
import { isEmailValid } from "../Helpers/regExValidator";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUs(){
    const navigate=useNavigate();

    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    });

    function handleInputChange(e){
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error('All fields are required!');
            return ;
        }

        if(!isEmailValid(userInput.email)){
            toast.error("Invalid Email!");
            return ;
        }

        const data={
            name:userInput.name,
            email:userInput.email,
            message:userInput.message
        }

        const response=  axiosInstance.post('/contact-us',data);
        await toast.promise(response,{
            loading:"submitting...",
            success:"Your response was submitted successfully!",
            error:(error)=>error?.response?.data?.message
        });
        await response;
        if(response?.data?.success) {
            navigate('/');
        }

        setUserInput({
            name:"",
            email:"",
            message:""
        });
    }

    return (
        <HomeLayout>
            <div className="w-full h-[90vh] flex justify-center items-center text-white">
                <div className="w-96 h-auto py-8 px-4 flex flex-col justify-center items-center space-y-4 rounded-md shadow-[0px_0px_10px_black]">
                  <h1 className="text-3xl font-bold ">Contact Us</h1>
                  <form onSubmit={onFormSubmit} noValidate className="w-full flex flex-col justify-start space-y-3">
                     <div className="space-y-1">
                        <label htmlFor="name" className="block">Name:</label>
                        <input type="text" name="name" id="name" value={userInput.name} onChange={handleInputChange} placeholder="enter your name " className="w-full outline-none px-4 py-2 rounded-md"/>
                     </div>

                     <div className="space-y-1">
                        <label htmlFor="email" className="block">Email:</label>
                        <input type="Email" name="email" id="email" value={userInput.email} onChange={handleInputChange} placeholder="enter your valid email " className="w-full outline-none px-4 py-2 rounded-md"/>
                     </div>

                     <div className="space-y-1">
                        <label htmlFor="message" className="block">Message:</label>
                        <textarea  name="message" id="message" value={userInput.message} onChange={handleInputChange} placeholder="enter your message.. " className="w-full h-28 resize-none oveflow-y-auto outline-none px-4 py-2 rounded-md "></textarea>
                     </div>
                     <button type="submit" className="w-full py-2 bg-yellow-600 text-md font-bold rounded">Submit</button>
                  </form>
                </div>
            </div>
         </HomeLayout>   
    );
}

export default ContactUs;