import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate= useNavigate();
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-9xl text-white font-extrabold tracking-wider">
          403
        </h1>
        <p className="text-sm bg-black text-white rotate-12 absolute rounded px-2">
          Acess Denied
        </p>



       
          <button onClick={()=>navigate("/")} className="btn btn-accent btn-md rounded-md text-white">
            Go back
          </button>
        
      </div>
    </div>
  );
}

export default Denied;
