import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isEmailValid } from "../Helpers/regExValidator.js";
import { forgotPassword } from "../Redux/Slices/user.slice.js";

function ForgotPassword(){
   const dispatch=useDispatch();
   const [userEmail,setUserEmail]=useState('');
   

   function handleInputChange(e){
     setUserEmail(e.target.value);
   }

   async function onFormSubmit(e){
      e.preventDefault();

      if(!userEmail){
         toast.error('email is required!');
         return ;
      }

      if(!isEmailValid(userEmail)){
         toast.error('Invalid email');
         return ;
      }
      const data={
        email:userEmail
      }
      const response=await dispatch(forgotPassword(data));
       console.log("t2",response);
     if(response?.payload?.success)  toast.success('check your email for reset link');

     setUserEmail("");
    

      
   }

    return (
        <HomeLayout>
             <div className="w-full h-[90vh] flex justify-center items-center text-white">
                <div className="w-96 h-auto rounded shadow-[0px_0px_10px_black] p-8 flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-2xl font-bold text-center">Forgot your Password ?</h1>
                    <p className="text-center text-sm">
                        <span className=" text-orange-700 font-semibold">Note:</span>
                        Don't worry just enter your password & we will send you password reset link
                    </p>
                    <form onSubmit={onFormSubmit} className="flex flex-col justify-start space-y-1 w-full">
                        <label htmlFor="email" className="block">Email:</label>
                        <input type="email" value={userEmail} id="email" name="email" placeholder="Enter your email .." onChange={handleInputChange} className="outline-none px-3 py-2 rounded-md w-full"/>
                        <button className="w-full bg-yellow-600 rounded text-sm font-bold py-2">
                            Send Email 
                        </button>
                    </form>
                </div>
             </div>
        </HomeLayout>
    )
}

export default ForgotPassword;