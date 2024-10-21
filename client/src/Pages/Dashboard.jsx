import HomeLayout from '../Layouts/HomeLayout.jsx';
import { Chart, CategoryScale, PieController, ArcElement, LinearScale, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../Redux/Slices/stats.slice.js';
import { Pie, Bar } from 'react-chartjs-2';
import { getAllPayment } from '../Redux/Slices/razorpay.slice.js';
import {FcSalesPerformance} from 'react-icons/fc';
import {GiMoneyStack} from 'react-icons/gi';
import {FaRupeeSign} from 'react-icons/fa';
import {getAllCourses,deleteCourseById} from '../Redux/Slices/course.slice.js';
import { FaTrash ,FaPen} from "react-icons/fa";



Chart.register(ArcElement, PieController, CategoryScale, LinearScale, Legend, Title, Tooltip, BarController, BarElement);


function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedUsers } = useSelector((state) => state?.stat);
    const { monthlySalesRecord, allPayments } = useSelector((state) => state?.razorpay);
    const {courseData}= useSelector((state)=>state?.course);

    const pieData = {
        labels: ["Registered User", "Subscribed User", "not subscribed"],
        fontColor: "white",
        datasets: [{
            label: "User Count",
            data: [allUsersCount, subscribedUsers, (allUsersCount - subscribedUsers)],
            backgroundColor: ["yellow", "green", "blue"],
            borderWidth: 1,
            borderColor: "white"
        }, ]


    };

    const barData = {
        labels: ["jan", "feb", "mar", "april", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"],
        fontColor: "white",
        datasets: [{
            label: "sales/month",
            data: monthlySalesRecord,
            backgroundColor: "yellow",
            borderWidth: 1,
            borderColor: "black"
        }],
    }


    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Legend text color
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // X-axis label color
                },
            },
            y: {
                ticks: {
                    color: 'white', // Y-axis label color
                },
            },
        },
    };

   async function handleCourseDelete(courseId){
   	  if(window.confirm("are you sure you want to delete this course ?")){
   	  	 await dispatch(deleteCourseById(courseId));
   	  	 await dispatch(getAllCourses());

   	  }
   }

    useEffect(() => {
        dispatch(getUserStats());
        dispatch(getAllPayment());
        dispatch(getAllCourses());
    }, [])

    return (
        <HomeLayout>
			<div className="w-full min-h-[90vh] py-8 px-4 text-white space-y-4">
            <h1 className="text-center text-4xl font-extrabold">Control What <span className="text-yellow-500">USERS RECEIVE</span></h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 border-b border-gray-700 ">
            	<div className="w-full text-center flex flex-col gap-2 items-center justify-center">
            	    <h1 className="text-lg font-bold text-center">Users Distribution on site</h1>
            		<div className="w-96 h-96">
            			<Pie data={pieData} options={{plugins: {
									    legend: {
									      labels: {
									        color: 'white', // Legend text color
									      },
									    },
									  }}}/>
            		</div>
            	</div>
            	<div className="w-full flex flex-col justify-center items-center space-y-3">
            		<h1 className="text-md font-bold">Payment Information in each month</h1>
            		<div className="w-full h-96">
            			<div className="w-full h-full">
            				<Bar data={barData} options={options}/>
            			</div>
            		</div>
            		<div className="w-full grid grid-cols-2">

            		 <div>
            		 <p className="text-lg font-bold flex gap-1 items-center"> <FcSalesPerformance size={"32px"}/> {" "}<span className="text-yellow-500">Subscription Count: </span>{" "} {allPayments?.count} </p>
            		 </div>

            		 <div className="flex items-center gap-2">
            		 	<GiMoneyStack size={"32px"}/>
            		 	<p className="text-lg font-bold text-yellow-600">Total Revenue:</p>
            		 	<p className="text-xl font-bold "> <FaRupeeSign className="inline" size={"22px"}/> {allPayments.count * 499}</p>
            		 </div>
            			
            		</div>
            	</div>
            </div>
            <div className="flex justify-start items-center py-2 px-7 space-x-5 relative">
            	<h1 className="text-2xl font-bold">Courses Overview </h1>
            	<button onClick={()=>navigate("/courses/create")} className="absolute right-2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out rounded py-2 px-4 text-md font-bold">Create Course</button>
            </div>
            <table className="w-full text-center rounded-md">
              <thead className="bg-gray-700">
            	<tr>
            		<th className="py-4 px-3">Sr.no.</th>
            		<th className="py-4 px-3">thumbnail</th>
            		<th className="py-4 px-3">Course title</th>
            		<th className="py-4 px-3">Category</th>
            		<th className="py-4 px-3">Instructor</th>
            		<th className="py-4 px-3">Total Lectures</th>
            		<th className="py-4 px-3">Description</th>
            		<th className="py-4 px-3">Actions</th>
            		
            	</tr>

            	</thead>

            	<tbody>

            	 {courseData.map((course,idx)=>(
            	 		<tr key={course?._id} className="even:bg-gray-900 odd:bg-gray-800 text-center">
                           <td>{idx+1}</td>   
                           <td className="h-16">
                             <img src={course?.thumbnail?.secure_url} className="object-contain w-24 h-16" alt="thumbnail"/>
                            </td> 
                           <td>{course?.title}</td>
                           <td>{course?.category}</td>
                           <td>{course?.createdBy}</td>
                           <td>{course?.numberOfLectures}</td>
                           <td><p className="h-12 w-72 text-justify overflow-y-scroll overflow-hidden">{course?.description}</p></td>  
                           <td className="space-x-6 align-middle">
                           	  
                           	  <FaPen onClick={()=>navigate("/courses/edit",{state:course?._id})} className="text-yellow-500 hover:text-yellow-600  cursor-pointer transition-all duration-300 ease-in-out  inline" size={"22px"} />
                           	  <FaTrash onClick={()=>handleCourseDelete(course?._id)} className="text-red-500 hover:text-red-600  cursor-pointer transition-all duration-300 ease-in-out inline " size={"22px"}/>
                           </td>      	 			
            	 		</tr>
            	 	))
            	}

            	</tbody>
            </table>
			</div>
		</HomeLayout>
    );
}

export default Dashboard;