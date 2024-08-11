import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Transactions from "./pages/Transactions";
import App from "./App";
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
            },
            {
                path: '/employees',
                element: <Employees/>
            }
        ]
    }
]

export default routes