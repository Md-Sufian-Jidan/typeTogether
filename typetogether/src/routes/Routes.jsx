import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Error from "../Error/Error";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import Editor from "../Components/Editor";
import MyDocs from "../Components/MyDocs";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <Error />,
    },
    {
        path: "/docs/:id",
        element: <Editor />
    },
    {
        path: "/my-docs",
        element: <MyDocs />
    },
    {
        path: '/login',
        element: <Login />
    }

]);
