import HomeLayout from '../../Layouts/HomeLayout.jsx';
import {useSelector,useDispatch} from 'react-redux';
import {useLocation,useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {getLectures} from '../../Redux/Slices/lecture.slice.js';
import {deleteLectureById} from '../../Redux/Slices/lecture.slice.js';
import {FaArrowLeft} from 'react-icons/fa';
import {deleteCourseById} from '../../Redux/Slices/course.slice.js';


function DisplayLectures(){
   const dispatch = useDispatch();
   const navigate= useNavigate();
   const {lectures} = useSelector((state)=>state?.lecture);
   const [currentVideo,setCurrentVideo]=useState(0);
   const {state}= useLocation();
   const {role} = useSelector((state)=>state?.user);

    
  async function handleDeleteLecture(courseId,lectureId){
        await dispatch(deleteLectureById({courseId,lectureId}));
        await  dispatch(getLectures(state._id));

   }  

   async function handleDeleteCourse(){

      if(window.confirm("are you sure you want to delete the course ?")){
        const res= await dispatch(deleteCourseById(state?._id));
      if(res?.payload?.success) navigate("/courses");
      }
   	  
   }

  useEffect(()=>{
  	  if(!state) return navigate('/courses');
     
      dispatch(getLectures(state?._id));

  },[]);


	return (
		<HomeLayout>
			<div className="w-full min-h-[90vh] flex justify-center items-cente text-white p-12">
   				<div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                   <div className="rounded shadow-[0px_0px_10px_black] p-4 flex flex-col justify-center space-y-3 overflow-y-auto">
                         <h1 className="text-2xl font-bold text-center"> <FaArrowLeft onClick={()=>navigate(-1)} className="cursor-pointer" size={"28px"}/> {" "}{state?.title}</h1>
                   	     <div>
                   	     	 <video src={ lectures? lectures[currentVideo]?.lecture?.secure_url:""} className="w-full object-fit rounded-tl-lg rounded-tr-lg  "controls muted disablePictureInPicture controlsList="nodownload" ></video>
                   	     </div>
                   	     <p className="text-md font-semibold">{lectures[currentVideo]?.title}</p>
                   	     <p className="text-sm">{lectures[currentVideo]?.description}</p>
                   </div>

                   <div className="flex flex-col justify-start p-6 rounded shadow-[0px_0px_10px_black] overflow-y-auto space-y-3">
                   	   {
                   	   	 lectures && lectures.map((lec,idx)=>(
                              <div className="space-y-1" key={lec._id}>
                                <p onClick={()=>setCurrentVideo(idx)} className="text-xl font-bold cursor-pointer"><span className="text-yellow-600">Lecture: </span>{idx+1}</p>
                              	<p className="text-lg">Title: {lec?.title}</p>
                                 {role==="ADMIN"  &&(
                                    <button onClick={()=>handleDeleteLecture(state._id,lec._id)} className="btn btn-sm text-white bg-red-600 font-bold text-md rounded-md hover:bg-red-700 transition duration-300 ease-in-out ">Delete</button>
                                 	)}
                              </div>
                   	   	 	))
                   	   }

                   	   {
                   	   	 role==="ADMIN" && (
                             <div className="space-x-4 w-full text-center">
                             	<button onClick={()=>navigate("/courses/addLecture",{state:{id:state?._id}})} className="font-bold text-md bg-yellow-500 hover:bg-yellow-600 transition ease-in-out duration-300 py-2 px-4 rounded">Add Lecture</button>
                             	<button onClick={handleDeleteCourse} className="font-bold text-md bg-red-500 hover:bg-red-600 transition ease-in-out duration-300 py-2 px-4 rounded">Delete Course</button>
                             </div>
                   	   	 	)
                   	   }
                   </div>


   				   	
   				</div>
			</div>
		</HomeLayout>
		);
}

export default DisplayLectures;