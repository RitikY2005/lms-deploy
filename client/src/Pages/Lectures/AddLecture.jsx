import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { useState ,useEffect} from 'react';
import { FaFileUpload } from 'react-icons/fa';
import {addLectureById} from '../../Redux/Slices/lecture.slice.js';
import {useDispatch} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import toast from 'react-hot-toast';
import {FaArrowLeft} from 'react-icons/fa';


function AddLecture() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state} = useLocation();
    const [userInput, setUserInput] = useState({
        title: "",
        description: '',
        lecture: null,
        previewVideo: ''
    });

    function handleFileInput(e) {
        const file = e.target.files[0];
     console.log("constols");
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                setUserInput({
                    ...userInput,
                    lecture: file,
                    previewVideo: reader.result
                });
            });
            console.log(reader.result);
        } else {
            setUserInput({
                ...userInput,
                lecture: null,
                previewVideo: ""
            })
        }

       
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(){

    	if(!userInput.title || !userInput.description || !userInput.lecture){
    		 toast.error("All fields are required!");
    		 return ;
    	}

        const data= new FormData();
        data.append("title",userInput.title);
        data.append("description",userInput.description);
        data.append("lecture",userInput.lecture);

        const response= await dispatch(addLectureById([state?.id,data]));

        setUserInput({
        title: "",
        description: '',
        lecture: null,
        previewVideo: '',
        })

    }

    useEffect(()=>{
    	 if(!state) return navigate("/courses");
    },[]);

    return (
        <HomeLayout>
	 		<div className="w-full h-[90vh] flex justify-center items-center text-white">
	 			<div className="w-96 rounded shadow-[0px_0px_10px_black] flex flex-col justify-center items-center p-4 space-y-4">
                   <h1 className="text-2xl font-bold text-center flex"> <FaArrowLeft size={"28px"} onClick={()=>navigate(-1)} className="cursor-pointer"/>Add lecture</h1>
                   <div className="w-full border h-48 rounded">
                   	  <label htmlFor="lecture" className="w-full" >
                            {userInput.previewVideo? (
                                <video src={userInput.previewVideo} className="object-fit w-full h-full" nocontrols="true" muted disablePictureInPicture controlsList="nodownload"></video>
                            	):
                               ( 
                               	<div className="btn text-white flex items-center justify-center h-full">
                    			<FaFileUpload size={"32px"}/>
                    			<span className="ml-2">Upload video</span>
                 				</div>
                            	)
                            }
                   	  </label>
                   	  <input type="file" name="lecture" id="lecture" className="hidden" onChange={handleFileInput} accept="video/*.mp4"/>
                   </div>

                   <div className="space-y-1 w-full">
                   	<label htmlFor="title" className="block font-bold">Title:</label>
                   	<input type="text" name="title" id="title" onChange={handleInputChange} value={userInput.title} className="w-full outline-none py-2 px-3 rounded" placeholder="enter title of video..." />
                   </div>

                                      <div className="space-y-1 w-full">
                   	<label htmlFor="description" className="block font-bold">Description:</label>
                   	<textarea name="description" id="description" onChange={handleInputChange} value={userInput.description} className="w-full h-32 resize-none overflow-y-auto outline-none py-2 px-3 rounded" placeholder="enter title of video..." />
                   </div>
                   <button onClick={onFormSubmit} className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out text-md font-bold">Create lecture</button>
	 			 </div>
	 		</div>
	 	</HomeLayout>
    );
}

export default AddLecture;