import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import Error from "../Error/Error";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><App /></PrivateRoute>,
        errorElement: <Error />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/login',
        element: <Login />
    }

]);
