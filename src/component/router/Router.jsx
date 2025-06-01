import React from 'react';

import {
  createBrowserRouter,
} from "react-router-dom"; 
import Main from '../main/Main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
]);


export default router;