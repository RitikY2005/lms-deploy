import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import {useDispatch, useSelector} from 'react-redux';
import { logout } from "../Redux/Slices/user.slice.js";

function HomeLayout({ children }) {
  const dispatch= useDispatch();
  
  function hideSidebar() {
    const drawer = document.getElementById("my-drawer");
    drawer.checked = !drawer.checked;
  }

  const {isLoggedIn,role}= useSelector((state)=>state?.user);

   async function handleLogout(){
    const res= await dispatch(logout());
    if(res?.payload?.success) hideSidebar();
  }

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
       
          {children}

          <Footer />
          <label
            htmlFor="my-drawer"
            className="cursor cursor-pointer fixed top-2 left-2 "
          >
            <AiOutlineMenu size={"32px"} />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-screen w-80 p-4 relative">
            {/* Sidebar content here */}

            <li className="absolute w-fit right-2 z-50">
              <button className="" onClick={hideSidebar}>
                <AiFillCloseCircle size={"22px"} />
              </button>
            </li>

            <li>
              <Link to="/"> Home </Link>
            </li>

            {
              role==="ADMIN" && (
                  <li>
              <Link to="/dashboard"> Dashboard </Link>
            </li>
                )
            }

            <li>
              <Link to="/courses"> All Courses </Link>
            </li>

            {
              role==="ADMIN" && (
                <li>
                  <Link to="/courses/create"> Create Course </Link>
                </li>
              )
            }



            <li>
              <Link to="/contact-us"> Contact Us </Link>
            </li>

            <li>
              <Link to="/about"> About Us </Link>
            </li>
            <div className="absolute bottom-4 w-[90%]">
              {!isLoggedIn && (
                            <div className=" w-full flex justify-center items-center  space-x-4">
                            <Link to="/login"><button className="btn btn-sm btn-secondary  px-8 py-2 w-full text-white font-semibold rounded-md">Login</button></Link>
                            <Link to="/signin"> <button className="btn btn-sm btn-primary  px-8 py-2 w-full text-white font-semibold rounded-md">signin</button></Link>
                          </div>
              )}

              {
                isLoggedIn && (
                  <div className=" w-full flex justify-center items-center  space-x-4">
                  <Link to="/user/profile"><button className="btn btn-sm btn-secondary  px-8 py-2 text-white font-semibold rounded-md">Profile</button></Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-primary  px-8 py-2 text-white font-semibold rounded-md">logout</button>
                </div>
                )
              }
            </div>

          </ul>

        </div>
      </div>
    </>
  );
}

export default HomeLayout;
