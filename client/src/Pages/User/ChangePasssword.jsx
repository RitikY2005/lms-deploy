import HomeLayout from '../../Layouts/HomeLayout.jsx';
import {useState} from 'react';
import toast from 'react-hot-toast';
import {isPasswordValid} from '../../Helpers/regExValidator.js';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {changeUserPassword} from '../../Redux/Slices/user.slice.js';

function ChangePassword(){

	const dispatch= useDispatch();
	const navigate= useNavigate();
  
  const [userInput,setUserInput]=useState({
      oldPassword:"",
      newPassword:""
  });

  
  function handleInputChange(e){
  	 const {name,value} =e.target;
  	 setUserInput({
  	 	...userInput,
  	 	[name]:value
  	 })
  }

  async function onFormSubmit(){
  	if(!userInput.oldPassword || !userInput.newPassword){
  		toast.error("all fields are required!");
  		return ;
  	}
        if(!isPasswordValid(userInput.newPassword)){
            toast.error('Password must contain atleast one character , symbol , number and must of atleast 6 character long');
            return ;
        }

      const data={
      	oldPassword:userInput.oldPassword,
      	newPassword:userInput.newPassword
      }

      const response= await dispatch(changeUserPassword(data));

      if(response?.payload?.success) navigate('/user/profile');

      setUserInput({
      	 oldPassword:"",
      	 newPassword:""
       });

  }



  return (
        <HomeLayout>
        	<div className="w-full h-[90vh] flex justify-center items-center text-white">
        		<div className="w-96 h-auto rounded shadow-[0px_0px_10px_black] flex flex-col justify-center items-center p-8 space-y-3">
        			<h1 className="text-3xl font-bold">Change Password</h1>
        			<div className="space-y-1 w-full">
        				<label htmlFor="oldPassword" className="block">Old Password:</label>
        				<input type="text" id="oldPassword" name="oldPassword" value={userInput.oldPassword} onChange={handleInputChange} placeholder="enter your old password.." className="w-full outline-none px-3 py-2 rounded-md " />
        			</div>
        			  <div className="space-y-1 w-full">
        				<label htmlFor="newPassword" className="block">New Password:</label>
        				<input type="text" id="newPassword" name="newPassword" value={userInput.newPassword} onChange={handleInputChange} placeholder="enter your new password.." className="w-full outline-none px-3 py-2 rounded-md " />
        			</div>
                    <button onClick={onFormSubmit} className="w-full rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out cursor-pointer text-md font-bold py-2">change password</button>
        		</div>
        	</div>
        </HomeLayout>
  	)
}


export default ChangePassword;