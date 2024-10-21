import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { useEffect, useState } from "react";
import {BsPersonCircle} from 'react-icons/bs';
import toast from 'react-hot-toast'; 
import { isEmailValid, isPasswordValid } from "../Helpers/regExValidator";
import { useDispatch } from "react-redux";
import {createAccount} from '../Redux/Slices/user.slice.js';

function Signin(){
    
     const dispatch= useDispatch();
     const navigate= useNavigate();

     const [userInput,setUserInput]=useState({
        fullName:"",
        email:"",
        password:"",
        imagePreview:"",
        avatar:null
     });

    function handleImageInput(e){
      const file= e.target.files[0];
        if(file){
            const reader= new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load',()=>{
                setUserInput({
                    ...userInput,
                    avatar:file,
                    imagePreview:reader.result
                 });
                 
            })
        } else{
            setUserInput({
                ...userInput,
                imagePreview:"",
                avatar:null
            });
        }
    }   

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

        if(!userInput.fullName || !userInput.email || !userInput.password || !userInput.avatar){
            toast.error('all fields are required!');
            return ;
        }

        // check if name is atleast three characters long
        if(userInput.fullName.length<3){
            toast.error('Name should be of atleast 3 characters !');
            return ;
        }

        // check if email is correct 
        if(!isEmailValid(userInput.email)){
            toast.error('Invalid Email ');
            return ;
        } 

        // check if password if correct 

        if(!isPasswordValid(userInput.password)){
            toast.error('Password must contain atleast one character , symbol , number and must of atleast 6 character long');
            return ;
        }

        const formData= new FormData();
        formData.append('fullName',userInput.fullName);
        formData.append('email',userInput.email);
        formData.append('password',userInput.password);
        formData.append('avatar',userInput.avatar);
        
        
       
        const response= await dispatch(createAccount(formData));
        
        if(response?.payload?.success) navigate('/user/profile');

        setUserInput({
            fullName:'',
            email:'',
            password:'',
            avatar:null,
            imagePreview:''
        }); 

    }


   return (
      
        <HomeLayout>
            <div className="w-full h-[90vh] flex justify-center items-center text-white">
                <div className="w-96 py-10 px-7 shadow-[0px_0px_10px_black] flex flex-col items-center rounded justify-center space-y-2">
                      <h1 className="text-3xl font-bold">Sign In </h1>
                      <p className="text-lg text-center">let's get you started up !</p>
                      <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-start space-y-4 w-full">

                        <div className="text-center w-full">
                            <label htmlFor="avatar" className="cursor-pointer flex justify-center items-center">
                               {userInput.imagePreview? (
                                 <img src={userInput.imagePreview} alt="avatar" className="w-24 h-24 rounded-full border "/>
                               ):(
                                <BsPersonCircle className="w-24  h-24 rounded-full border"/>
                               )}
                            </label>
                            <input type="file" id="avatar" name="avatar" accept="*.jpg,*.png,*.jpeg,*svg,*webp" className="hidden" onChange={handleImageInput}/>
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="fullName" className="block">Name:</label>
                            <input type="text" id="fullName" value={userInput.fullName} name="fullName" placeholder="enter your full name" onChange={handleInputChange} className="w-full py-2 px-3 rounded outline-none"/>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block">Email:</label>
                            <input type="email" id="email" value={userInput.email} name="email" placeholder="enter your email address" onChange={handleInputChange} className="w-full py-2 px-3 rounded outline-none"/>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="block">Password:</label>
                            <input type="password" id="password" value={userInput.password} name="password" placeholder="enter your password" onChange={handleInputChange} className="w-full py-2 px-3 rounded outline-none"/>
                        </div>

                        <button type="submit" className="w-full text-center py-1 bg-yellow-500 text-white text-md font-bold rounded-sm" >
                            Signin
                        </button>

                        <div className="w-full text-sm text-left ">
                            Already have an account ? <Link to="/login" className="link text-primary visited:text-purple-600">Login Instead</Link>
                        </div>
                      </form>
                </div>
            </div>
        </HomeLayout>

   )
}

export default Signin;