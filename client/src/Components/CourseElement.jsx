import { useNavigate } from "react-router-dom";


function CourseElement({data}){
 const navigate=useNavigate();

 function handleClick(){
    navigate("/courses/description",{state:data})
 }


   return (
    <div onClick={handleClick} className="w-96 h-96 overflow-hidden p-3 shadow-[0px_0px_10px_black] rounded-sm hover:scale-[1.02] transition-all cursor-pointer duration-300">
        <div className="space-y-3">
            <div className="w-full h-[200px]">
                <img src={data?.thumbnail?.secure_url} alt="course thumbnail" className="h-full w-full object-cover rounded-sm"/>
            </div>
            <div className="space-y-1">
            <p className="text-white text-md font-bold text-left">{data?.title}</p>
            <p className="font-semibold text-sm line-clamp-2">{data?.description}</p>
            </div>    
            <div className="flex justify-between">
              <p className="text-md font-bold text-white">lectures: <span className="text-yellow-500">{data?.numberOfLectures}</span></p>   
              <p className="text-md font-bold text-white">Category: <span className="text-yellow-500">{data?.category}</span></p>
            </div>
        </div>
    </div>
   )
}

export default CourseElement;