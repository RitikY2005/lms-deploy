import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

function RequireAuth({allowedRoles}){
    const {role,isLoggedIn}= useSelector((state)=>state?.user);

    return isLoggedIn && allowedRoles.find((allowedRole)=> allowedRole===role) ? <Outlet/> : isLoggedIn ? <Navigate to="/denied"/> :<Navigate to="/login"/>
}

export default RequireAuth;