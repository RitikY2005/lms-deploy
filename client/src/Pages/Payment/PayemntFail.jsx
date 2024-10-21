import HomeLayout from '../../Layouts/HomeLayout.jsx';
import {FaTimesCircle} from "react-icons/fa" ;
import {Link} from 'react-router-dom';

function PayemntFail(){
	return (
		<HomeLayout>
			<div className="w-full h-[90vh] flex justify-center items-center text-white">
				<div className="rounded shadow-[0px_0px_10px_black] w-96 flex flex-col justify-center items-center space-y-4 p-8">
					<h1 className="text-center text-2xl font-bold text-red-500 flex"> <FaTimesCircle size={"28px"} /> {" "} Payment Failed</h1>
					<p className="text-lg font-semibold">Something went wrong with the payment . </p>
					<p className="text-md text-justify w-full">In case money was deducted from your account , it will refunded soon .</p>
					<p className="text-md text-center">Try dooing the payment again - </p>
					<Link to="/courses" className="w-full text-center py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out text-md font-bold">Try again </Link>
				</div>
			</div>
		</HomeLayout>
		);
}


export default PayemntFail;