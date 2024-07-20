import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Transactions from "./pages/Transactions";
import App from "App";
import ErrorPage from "./pages/ErrorPage";

const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/customers',
                element: <Customers/>
            },
            {
                path: '/inventory',
                element: <Inventory/>
            },
            {
                path: '/transactions',
                element: <Transactions/>
            }
        ]
    }
]

export default routes