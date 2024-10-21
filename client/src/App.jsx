import {Routes ,Route} from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage.jsx';
import Signin from './Pages/Signin.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import NotFoundpage from './Pages/NotFoundpage.jsx';
import About from './Pages/About.jsx';
import Courses from './Pages/Courses/Courses.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import Denied from './Pages/Denied.jsx';
import CourseDescription from './Pages/Courses/CourseDescription.jsx';
import RequireAuth from './Components/Auth/RequireAuth.jsx';
import CreateCourse from './Pages/Courses/CreateCourse.jsx';
import ProfilePage from './Pages/User/ProfilePage.jsx';
import EditProfile from './Pages/User/EditProfile.jsx';
import ChangePassword from './Pages/User/ChangePasssword.jsx';
import CheckoutPage from './Pages/Payment/CheckoutPage.jsx';
import PaymentSuccess from './Pages/Payment/PaymentSuccess.jsx';
import PayemntFail from "./Pages/Payment/PayemntFail.jsx";
import DisplayLectures from './Pages/Lectures/DisplayLectures.jsx';
import AddLecture from './Pages/Lectures/AddLecture.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import UpdateCoursePage from './Pages/Courses/UpdateCoursePage.jsx';

function App() {


  return (
  	<>
     <Routes>
         <Route path="/" element={<Homepage/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/forgot-password' element={<ForgotPassword/>}/>
         <Route path='/reset-password/:resetToken' element={<ResetPassword/>}/>
         <Route path='*' element={<NotFoundpage/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path='/courses' element={<Courses/>}/>
         <Route path='/contact-us' element={<ContactUs/>}/>
         <Route path='/denied' element={<Denied/>}/>
         <Route path="/courses/description" element={<CourseDescription/>}/>

         <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            <Route path='/courses/create' element={<CreateCourse/>}/>
            <Route path="/courses/addLecture" element={<AddLecture/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/courses/edit" element={<UpdateCoursePage/>}/>

         </Route>

         <Route element={<RequireAuth allowedRoles={["USER"]}/>}>
             
             <Route path="/payment/checkout" element={<CheckoutPage/>}/>
                 <Route path="/payment/success" element={<PaymentSuccess/>}/>
                 <Route path="/payment/fail" element={<PayemntFail/>} />
               
         </Route>

         <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
             <Route path='/user/profile' element={<ProfilePage/>}/>
             <Route path='/user/editProfile' element={<EditProfile/>}/>
             <Route path="/user/changePassword" element={<ChangePassword/>} />
             <Route path="/courses/displayLectures" element={<DisplayLectures/>} />
         </Route>
     </Routes>
     </>
    
  )
}

export default App;
