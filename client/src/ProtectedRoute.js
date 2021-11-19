import React, { useState } from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth }) {

    return (
        isAuth ? children : <Navigate to="/authentication" />
    )
}
export default ProtectedRoute;

 //     <Route
        //         {...rest} render={(props) => {
        //             if (isAuth) {
        //                 return <Component />
        //             }
        //             else {
        //                 <Navigate to={{ pathname: "/", state: { from: props.location } }} />
        //             }
        //         }} 
        // />