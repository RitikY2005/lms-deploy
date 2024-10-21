import { FaFileUpload } from "react-icons/fa";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate ,useLocation} from "react-router-dom";
import { updateCourse } from "../../Redux/Slices/course.slice";
import {FaArrowLeft} from 'react-icons/fa';

function UpdateCoursePage() {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const {state}= useLocation();
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    createdBy: "",
    category: "",
    
  });



  function handleInputChange(e){
    const {name, value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  async function handleSubmit(){
      if(!userInput.title && !userInput.description && !userInput.category && !userInput.createdBy){
          toast.error("atleast one field is required!");
          return ;
      }

      if(userInput.title && userInput.title.length<5 && userInput.title.length>50){
        toast.error('title should be  5-50 characters long');
        return ;
      }

      if(userInput.description && userInput.description.length<20){
         toast.error("description should be atleast 20 characters long!");
         return ;
      }



      const data={};
       
      Object.keys(userInput).map((key)=> {
        if(userInput[key]){
          data[key]=userInput[key];
        }
      }) 
      // if(userInput.title){
      //   data.title=userInput.title;
      // }

      // if(userInput.description){
      //   data.description=userInput.description;
      // }

      // if(userInput.createdBy){
      //   data.createdBy=userInput.createdBy;
      // }

      // if(userInput.category){
      //   data.category=userInput.category;
      // }

     
     
      const response= await dispatch(updateCourse([state,data]));

      if(response?.payload?.success){
        navigate("/dashboard");
      }

      setUserInput({
        title: "",
        description: "",
        createdBy: "",
        category: "",
       
      });

  }

  useEffect(()=>{
      if(!state) return navigate("/dashboard");
  },[])

  return (
    <HomeLayout>
      <div className="w-full min-h-[90vh] flex justify-center items-center text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
          <div className="w-full rounded shadow-[0px_0px_10px_black] p-8 flex flex-col justify-start space-y-4">
            <h1 className="text-2xl font-bold text-center ">
              <FaArrowLeft onClick={()=>navigate("/dashboard")} size={"28px"} className="inline"/> {" "}
              Update the course
            </h1>
            <div className="w-full h-72 border rounded">
              <label
                htmlFor="thumbnail"
                className="block border w-full h-full "
              >
                {userInput.previewThumbnail ? (
                  <img
                    src={userInput.previewThumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="btn text-white flex items-center justify-center h-full">
                    <FaFileUpload size={"32px"}/>
                    <span className="ml-2">Not Allowed</span>
                  </div>
                )}
              </label>
              <input
                
                name="thumbnail"
                accept="image/png,image/jpeg,image/webp,image/svg"
                id="thumbnail"
                className="hidden"
                disable="true"
              />
            </div>

            <div className="space-y-1">
                <label htmlFor="title" className="block">Title:</label>
                <input type="text" id="title" name="title" placeholder="enter title of course.." value={userInput.title} onChange={handleInputChange} className="outline-none px-2 py-2 rounded-sm w-full"/>
            </div>

            <div className="space-y-1">
                <label htmlFor="category" className="block">Category:</label>
                <input type="text" id="category" name="category" placeholder="enter category of this course.." value={userInput.category} onChange={handleInputChange} className="outline-none px-2 py-2 rounded-sm w-full"/>
            </div>
             
            
          </div>
          <div className="w-full rounded shadow-[0px_0px_10px_black] p-8 flex flex-col justify-start  space-y-4">
          <div className="space-y-1">
                <label htmlFor="createdBy" className="block">CreatedBy:</label>
                <input type="text" id="createdBy" name="createdBy" placeholder="enter name of the instructor.." value={userInput.createdBy} onChange={handleInputChange} className="outline-none px-2 py-2 rounded-sm w-full"/>
            </div>

            <div className="space-y-1">
                <label htmlFor="description" className="block">Description:</label>
                <textarea  id="description" name="description" placeholder="enter description of this course.." value={userInput.description} onChange={handleInputChange} className="h-72 overflow-y-auto resize-none outline-none px-2 py-2 rounded-sm w-full"></textarea>
            </div>
            <div className="text-center">
                <button onClick={handleSubmit} className="w-full bg-yellow-500 hover:bg-yellow-600 text-md font-bold transition-all duration-300 ease-in-out cursor-pointer py-2 rounded-md">Update course</button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default UpdateCoursePage;
