import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import toast from "react-hot-toast";
import { useDispatch  } from "react-redux";
import { isEmailValid, isPasswordValid } from "../Helpers/regExValidator.js";
import { useParams ,useNavigate} from "react-router-dom";
import { resetPassword } from "../Redux/Slices/user.slice.js";

function ResetPassword(){
   const dispatch=useDispatch();
   const navigate= useNavigate();
   const [userPassword,setUserPassword]=useState('');
   const {resetToken}= useParams();
   

   function handleInputChange(e){
     setUserPassword(e.target.value);
   }

   async function onFormSubmit(e){
      e.preventDefault();

      if(!userPassword){
         toast.error('password is required!');
         return ;
      }

      if(!isPasswordValid(userPassword)){
        toast.error('Password must contain atleast one character , symbol , number and must of atleast 6 character long');
         return ;
      }

      const data={
        password:userPassword,
        resetToken:resetToken
      }

      const response=await dispatch(resetPassword(data));
      console.log("t1",response);
      if(response?.payload?.success){
         navigate('/login');
      }

      setUserPassword('');



      
   }

    return (
        <HomeLayout>
             <div className="w-full h-[90vh] flex justify-center items-center text-white">
                <div className="w-96 h-auto rounded shadow-[0px_0px_10px_black] p-8 flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-2xl font-bold text-center">reset your password</h1>
                    <p className="text-center text-sm">
                        <span className=" text-orange-700 font-semibold">Note:</span>
                        Enter new password to reset your account password
                    </p>
                    <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-start space-y-1 w-full">
                        <label htmlFor="password" className="block">Password:</label>
                        <input type="password" id="password" value={userPassword} name="password" placeholder="Enter your new password .." onChange={handleInputChange} className="outline-none px-3 py-2 rounded-md w-full"/>
                        <button className="w-full bg-yellow-600 rounded text-sm font-bold py-2">
                            Reset Password 
                        </button>
                    </form>
                </div>
             </div>
        </HomeLayout>
    )
}

export default ResetPassword;