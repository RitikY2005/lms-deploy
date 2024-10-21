import HomeLayout from "../Layouts/HomeLayout.jsx";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import celebrities from "../Constants/celebrities.js";
import CarouselElements from '../Components/CorouselElements.jsx';
import { useEffect } from "react";


function About() {

  return (
    <HomeLayout>
      <div className="w-full min-h-[90vh] flex justify-center items-center text-white">
        <div className="w-1/2 flex flex-col justify-center items-start space-y-4">
          <h1 className="text-5xl  font-extrabold text-left">
            Where quality meets{" "}
            <span className="text-yellow-500">expectations</span>
          </h1>
          <p className="text-md font-bold font-mono tracking-tighter">
            We have taken oath to provide education at the most affordable rates
            in entire india . You can verfy this information by contacting one
            of our taught and prepared sales executive
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={aboutMainImage}
            alt="aboutPageImage"
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <div className="carousel w-96">
       
         { 
          celebrities.map((celebrity,idx)=>{
            return <CarouselElements 
              key={idx}
              title={celebrity.title}
              description={celebrity.description}
              currentPos={idx}
              totalEle={celebrities.length}
              image={celebrity.image}
             />
          })
         }
          

        
         
        </div>
      </div>
    </HomeLayout>
  );
}
export default About;
