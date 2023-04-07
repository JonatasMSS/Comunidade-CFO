
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { ErrorPage } from '../pages/ErrorPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PostPage } from '../pages/post_page/PostPage';
import { AuthProvider } from '../context/AuthContext';
import { RedirectionLinkPage } from '../pages/RedirectionLinkPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { RegisterFromGooglePage } from '../pages/RegisterFromGooglePage';

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
        element:<RegisterPage/>,
    },
    {
        path:'posts',
        element:<AuthProvider child={<PostPage/>}/>
    },
    {
        path:'registro/redirection',
        element:<RedirectionLinkPage/>
    },
    {
        path:'forgotpassword',
        element:<ForgotPasswordPage/>
    },
    {
        path:'googlesignin',
        element:<RegisterFromGooglePage/>
    }
])

export default routes;