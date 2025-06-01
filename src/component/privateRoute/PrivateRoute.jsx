import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={"/singin"}></Navigate>
};

export default PrivateRoute;