
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { ErrorPage } from '../pages/ErrorPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PostPage } from '../pages/post_page/PostPage';

const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"login",
        element:<LoginPage/>,
    },
    {
        path:'registro',
        element:<RegisterPage/>
    },
    {
        path:'posts',
        element:<PostPage/>
    }
])

export default routes;