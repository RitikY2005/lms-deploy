import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import homePageMainImage from '../Assets/Images/homePageMainImage.png';

function Homepage() {
  return (
    <HomeLayout>
         <div className='w-full h-[90vh] flex flex-col md:flex-row justify-center items-center text-white'>
              <div className='w-1/2 space-y-4'>
                     <h1 className='text-5xl font-extrabold text-left '>
                          <span>Find out best {" "}</span> 
                          <span className='text-yellow-600'>Online Courses</span>
                     </h1>
                     <p className='text-lg text-left'>
                        Learn from the best teaching faculty in the world verified by NASA and modi themselves . We will make your every penny worth 
                     </p>

                     <div className='text-center sm:text-left space-x-4'>
                     <Link to="/courses"> <button className='btn bg-yellow-500 rounded-md text-white text-sm font-bold hover:bg-yellow-600 transition-all duration-300 ease-in-out'>Explore Courses</button></Link>
                     <Link to="/contact-us"><button className='btn border border-yellow-500 rounded-md text-white text-sm font-bold hover:bg-yellow-600 transition-all duration-300 ease-in-out'>Contact Us</button></Link>
                        
                     </div>

              </div>
              <div className='flex justify-center items-center'>
                <img src={homePageMainImage} alt="homepage image" className='object-contain'/>
              </div>
         </div>
    </HomeLayout>
  );
};

export default Homepage;
