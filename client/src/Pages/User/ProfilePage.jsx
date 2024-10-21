 import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import {getUserData} from '../../Redux/Slices/user.slice.js';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {cancelSubscription} from '../../Redux/Slices/razorpay.slice.js';

 
 function ProfilePage(){
    
   const userData=useSelector((state)=>state?.user?.data); 
   const dispatch= useDispatch();
   const navigate= useNavigate();

  async function handleCancelSubscription(){
      const res= await dispatch(cancelSubscription());

      if(res?.payload?.success) dispatch(getUserData()) ;
  }


   useEffect(()=>{
        dispatch(getUserData());
   },[]);

    return (
        <HomeLayout>
            <div className="w-full h-[90vh] flex justify-center items-center text-white">
                 <div className="w-96 h-auto p-8 rounded shadow-[0px_0px_10px_black] flex flex-col justify-start items-center space-y-3">
                      <h1 className="text-3xl font-bold">Profile</h1>
                      <div className="text-center space-y-1 w-full">
                         <img src={userData?.avatar?.secure_url} alt="user profile" className="w-48 h-48 mx-auto rounded-full border object-cover"/>
                         <p className="text-md font-semibold ">{userData?.fullName}</p>
                      </div>

                      <div className="w-full space-x-2 flex">
                         <p className="text-md font-semibold">Email:</p>
                         <p className="text-md text-left">{userData?.email}</p>
                      </div>
                      <div className="w-full space-x-2 flex">
                         <p className="text-md font-semibold">Role:</p>
                         <p className="text-md text-left">{userData?.role}</p>
                      </div>
                      <div className="w-full space-x-2 flex">
                         <p className="text-md font-semibold">Subscription:</p>
                         <p className="text-md text-left">{userData?.subscription?.status || "NOT STARTED"}</p>
                      </div>

                      <div className="flex justify-center items-center w-full space-x-2">
                            <Link to="/user/changePassword" className="w-48 px-4 py-2 text-sm text-center font-bold rounded-md bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out cursor-pointer"><button >Change Password</button></Link>
                            <Link to="/user/editProfile" className="w-48 px-4 py-2 text-sm text-center font-bold rounded-md bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out cursor-pointer"><button >Edit Profile</button></Link>
                      </div>

                      {
                        userData?.subscription?.status==="active" && (
                            <div className="w-full">
                                <button onClick={handleCancelSubscription} className="w-full py-2 rounded bg-red-500 hover:bg-red-600 transition ease-in-out duration-300 cursor-pointer font-bold ">Cancel Subscription</button>
                             </div>   
                        )
                      }
                 </div>
            </div>
        </HomeLayout>
    )
 }

 export default ProfilePage;