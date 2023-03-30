
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { ErrorPage } from '../pages/ErrorPage';

const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"login",
        element:<LoginPage/>
    }
])

export default routes;