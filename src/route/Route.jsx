import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddBlog from "../pages/AddBlog";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AllBlogList from "../pages/AllBlogList";
import Blog from "../pages/Blog";
import MyPosts from "../pages/MyPosts";
import EditBlog from "../pages/EditBlog";
import ProtectedRoute from "./ProtectedRoute";

function Route() {
    const handleLogout = () => {
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    };

    const route = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/add-blog',
            element: <ProtectedRoute><AddBlog /></ProtectedRoute>
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/allblogs',
            element: <ProtectedRoute><AllBlogList /></ProtectedRoute>
        },
        {
            path: '/fullarticle/:id',
            element: <ProtectedRoute><Blog /></ProtectedRoute>
        },
        {
            path: '/myblogs',
            element: <ProtectedRoute><MyPosts /></ProtectedRoute>
        },
        {
            path: '/editpost/:id',
            element: <ProtectedRoute><EditBlog /></ProtectedRoute>
        },
        {
            path: '/logout',
            element: handleLogout()
        }
    ]);

    return <RouterProvider router={route} />;
}

export default Route;
