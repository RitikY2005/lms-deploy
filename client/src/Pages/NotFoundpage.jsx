import { Link } from "react-router-dom";



function NotFoundpage(){
    return (
        <div className="w-full h-screen overflow-hidden flex justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-4">
                <h1 className="text-9xl text-white font-extrabold tracking-wider"> 
                    404
                </h1>
                <p className="text-sm bg-black text-white rotate-12 absolute rounded px-2">
                    Page not Found
                </p>
                
                <Link to="/">
                <button className="btn btn-neutral btn-md rounded-md text-white">
                    Go to Home
                    </button>
                    </Link>
            </div>
        </div>
    )
}

export default NotFoundpage;