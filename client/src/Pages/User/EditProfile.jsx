import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserProfile } from "../../Redux/Slices/user.slice";

function EditProfile() {
   const dispatch=useDispatch(); 
   const navigate=useNavigate();
   const user =useSelector((state)=>state?.user?.data);
   const [userInput, setUserInput] = useState({
    fullName: "",
    avatar: null,
    imagePreview: "",
   });

  function handleImageInput(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setUserInput({
          ...userInput,
          avatar: file,
          imagePreview: reader.result,
        });
      });
    } else {
      setUserInput({
        ...userInput,
        avatar: null,
        imagePreview: "",
      });
    }
  }

  function handleInputChange(e){
     const {name,value}=e.target;
     setUserInput({
        ...userInput,
        [name]:value
     })
  }

  async function handleSubmit(){
     if(!userInput.fullName && !userInput.avatar){
        toast.error("atleast one of them is required!");
        return ;
     }

     if(userInput.fullName && userInput.fullName.length<3){
        toast.error("name should be of atleast 3 characters");
        return ;
     }

     const formData= new FormData();
     formData.append('fullName',userInput.fullName);
     formData.append('avatar',userInput.avatar);
     

     const response= await dispatch(editUserProfile([user?._id,formData]));
     if(response?.payload?.success){
         navigate('/user/profile');
     }

     setUserInput({
        fullName:'',
        avatar:null,
        imagePreview:''
     });
  } 

  return (
    <HomeLayout>
      <div className="w-full h-[90vh] flex justify-center items-center text-white ">
        <div className="w-96 flex flex-col justify-center items-center p-8 rounded shadow-[0px_0px_10px_black] space-y-4">
          <h2 className="text-3xl font-bold">Update profile</h2>
          <div className="text-center w-full">
            <label
              htmlFor="avatar"
              className="cursor-pointer flex justify-center items-center"
            >
              {userInput.imagePreview ? (
                <img
                  src={userInput.imagePreview}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border "
                />
              ) : (
                <BsPersonCircle className="w-24  h-24 rounded-full border" />
              )}
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="*.jpg,*.png,*.jpeg,*svg,*webp"
              className="hidden"
              onChange={handleImageInput}
            />
          </div>
          <div className="w-full space-y-1">
            <label htmlFor="fullName" className="block">
              FullName:{" "}
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={userInput.fullName}
              className="outline-none w-full px-3 py-2 rounded"
              placeholder="enter your new name ..."
              onChange={handleInputChange}
            />
          </div>

          
            <button onClick={handleSubmit} className="w-full rounded py-2 text-md font-bold bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out cursor-pointer">
                Edit Profile
            </button>
          
        </div>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
