import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { useEffect } from 'react';
import CourseElement from '../../Components/CourseElement.jsx';
import { getAllCourses } from '../../Redux/Slices/course.slice.js';

function Courses(){
   const dispatch=useDispatch();
   const courseData= useSelector((state)=>state?.course?.courseData);
 
  useEffect(()=>{
     dispatch(getAllCourses());
     console.log(courseData);
  },[])

    return (
        <HomeLayout>
            <div className='w-full min-h-[90vh] p-8'>
                <h1 className='text-white text-4xl font-extrabold text-center'>
                    Explore the courses made by <span className='text-yellow-500'>industry experts </span>
                </h1>
                <div className='my-8 p-8 flex flex-wrap justify-start items-center gap-6'>
                   {
                    courseData?.map((course)=>(
                        <CourseElement key={course._id} data={course}/>
                    ))
                   }
                </div>
            </div>
        </HomeLayout>
    );
}

export default Courses;