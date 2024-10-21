import { useSelector } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import {FaRupeeSign} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {getRazorpayKey,buySubscription,verifyPayment} from '../../Redux/Slices/razorpay.slice.js';
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";



function CheckoutPage() {
    
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const { key, subscription_id } = useSelector((state) =>state?.razorpay);
    const user=useSelector(state=>state?.user?.data);
    const [canPay,setCanPay]=useState(false);

    const options = {
        "key": key, // Enter the Key ID generated from the Dashboard
        "amount": "1", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Learn Magic co.LTD", //your business name
        "description": "One time subscripiton for all courses",
        "subscription_id":subscription_id,
        "handler": async function(response) {
                 
                 if(response) {
                    const res=await dispatch(verifyPayment(response));
                    if(res?.payload?.success) navigate('/payment/success');
                    else navigate("/payment/fail");

                 }

        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name":user?.fullName , //your customer's name
            "email": user?.email,
            "contact": "34973294739" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Jupiter , next corner close to aliens,lala land road ,5004332"
        },
        "theme": {
            "color": "#1d232a"
        }
    };

   async function handleClick(){
        const raz= new Razorpay(options);
        raz.open();

    }

    useEffect(()=>{
    	  (async ()=>{
              await dispatch(getRazorpayKey());
              await dispatch(buySubscription());
              setCanPay(user.subscription?(user?.subscription?.status!=="active"?true:false):true);
        })();
    },[])

    return (
       <HomeLayout>
       	  <div className="w-full h-[90vh] flex justify-center items-center text-white">
       	  	<div className="w-96 h-auto flex flex-col justify-center items-center space-y-4 rounded shadow-[0px_0px_10px_black] p-8">
       	  		<h1 className="text-2xl font-bold text-center text-yellow-600">Subscribe to our course</h1>
       	  		<p className="text-md text-justify">
       	  			we are offering single-subscription for all courses . if you subscribe to this course , you can access all the courses without additional cost
       	  		</p>
       	  		<div className="text-3xl font-extrabold text-yellow-500 flex">
       	  			 Price(<FaRupeeSign size={"32px"} />) :
       	  			
       	  			<span className="text-white"> 499 only  </span>
       	  		</div>
       	  		<div className="text-2xl font-extrabold text-yellow-500 flex">
       	  			 Refund (Time) :
       	  			
       	  			<span className="text-white"> 14 days  </span>
       	  		</div>

       	  		<button disabled={!canPay} onClick={handleClick} className="w-full rounded-md py-2 text-md font-bold bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out">Buy now</button>
       	  	</div>
       	  </div>
       </HomeLayout>
    	);
}

export default CheckoutPage;