import React from 'react';

import {
  createBrowserRouter,
} from "react-router-dom"; 
import Main from '../main/Main';

import Home from '../Home';
import SingUp from '../authentication/SingUp';
import SingIn from '../authentication/SingIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/signup",
            element: <SingUp></SingUp>
        },
        {
            path: "/singin",
            element: <SingIn></SingIn>
        }
    ]
  },
]);


export default router;