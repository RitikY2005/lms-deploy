import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {useEffect} from 'react';

function CourseDescription() {
  const navigate=useNavigate();
  const course = useLocation().state;
  const user= useSelector(state=>state?.user?.data);
 
  useEffect(()=>{
       if(!course) navigate('/courses');
  },[])

  return (
    <HomeLayout>
      <div className="w-full h-[90vh] flex justify-center items-center px-8 text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-start p-8 shadow-[0px_0px_10px_black] rounded space-y-4">
           
           <button onClick={()=>navigate(-1)} className="cursor-pointer">
           <FaArrowLeft size={"28px"} />
           </button> 

            <div className="w-full h-72">
              <img
                src={course?.thumbnail?.secure_url}
                alt="thumbnail"
                className="object-cover w-full h-full rounded-sm"
              />
            </div>

            <div className="space-y-1">
              <p className="text-white text-xl font-bold text-left">
                {course?.title}
              </p>
             
            </div>

            <div className="flex justify-between items-center">
                <p className="text-yellow-600 text-md font-bold">
                    total lectrues: <span className="text-white">{course?.numberOfLectures}</span>
                </p>

                <p className="text-yellow-600 text-md font-bold">
                    category: <span className="text-white">{course?.category}</span>
                </p>
            </div>

            <div className="text-yellow-600 text-md font-bold">
                Created By: <span className="text-white">{course?.createdBy}</span>
            </div>

            <div className="text-center">
                {
                    (user?.subscription?.status!=="active" && user?.role!=="ADMIN")? 
                    (
                        <button onClick={()=>navigate("/payment/checkout")} className="w-48 py-2 font-bold text-md rounded-md bg-orange-500 hover:bg-orange-600 transition-all duration-300 ease-out"> Subscribe</button>

                    ):
                    (
                        <button onClick={()=> navigate("/courses/displayLectures",{state:course}) } className="w-48 py-2 font-bold text-md rounded-md bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-out">Watch Lectures </button>
                    )
                }
               
            </div>
          </div>
          <div className="p-8 shadow-[0px_0px_10px_black] rounded">
              <p className="text-lg font-bold text-yellow-600">Description: </p>
              <p className=" text-md ">
                {course?.description}
              </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
