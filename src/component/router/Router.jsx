import React from 'react';

import {
  createBrowserRouter,
} from "react-router-dom";
import Main from '../main/Main';

import Home from '../Home';
import SingUp from '../authentication/SingUp';
import SingIn from '../authentication/SingIn';
import AddMoney from '../AddMoney';
import CostInfo from '../CostInfo';
import PrivateRoute from '../privateRoute/PrivateRoute';
import Profile from '../Profile';
import NewBorder from '../NewBorder';
import Moneyadd from '../Moneyadd';
import CostUpdate from '../CostUpdate';

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
      },
      {
        path: "/addmoney",
        element: <PrivateRoute><AddMoney></AddMoney></PrivateRoute>
      },
      {
        path: "/costinfo",
        element: <PrivateRoute><CostInfo></CostInfo></PrivateRoute>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: "/addborder",
        element: <PrivateRoute><NewBorder></NewBorder></PrivateRoute>
      },
      {
        path: "/costUpdate/:id",
        element: <CostUpdate></CostUpdate>,
        loader: ({params}) => fetch(`http://localhost:5000/costone/${params.id}`)
      }
    ]
  },
]);


export default router;