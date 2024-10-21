import HomeLayout from '../../Layouts/HomeLayout.jsx';
import {FaCheckCircle} from "react-icons/fa" ;
import {Link} from 'react-router-dom';

function PaymentSuccess(){
	return (
		<HomeLayout>
			<div className="w-full h-[90vh] flex justify-center items-center text-white">
				<div className="rounded shadow-[0px_0px_10px_black] w-96 flex flex-col justify-center items-center space-y-4 p-8">
					<h1 className="text-center text-2xl font-bold text-green-500 flex"> <FaCheckCircle size={"28px"} /> {" "} Payment successfull</h1>
					<p className="text-lg font-semibold">Welcome to <span className="text-yellow-500">Pro bundle</span></p>
					<p className="text-md text-justify w-full">Now you have access to all our courses without additional cost . You can check them out now .</p>
					<p className="text-md text-center">If you wish to cancel subscription head to your profile </p>
					<Link to="/user/profile" className="w-full text-center py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out text-md font-bold">Profile </Link>
				</div>
			</div>
		</HomeLayout>
		);
}


export default PaymentSuccess;