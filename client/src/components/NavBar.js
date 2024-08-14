import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <nav className="flex flex-row justify-around w-full bg-[#828282] px-1 py-4">
            <NavLink to='/' className="text-center bg-white px-2 py-0.5 m-2 w-96 focus:border-black focus:border-4">Home</NavLink>
            <NavLink to='/customers' className="text-center bg-white px-2 py-0.5 m-2 w-96 focus:border-black focus:border-4">Customers</NavLink>
            <NavLink to='/transactions' className="text-center bg-white px-2 py-0.5 m-2 w-96 focus:border-black focus:border-4">Transactions</NavLink>
            <NavLink to='/inventory' className="text-center bg-white px-2 py-0.5 m-2 w-96 focus:border-black focus:border-4">Inventory</NavLink>
            <NavLink to='/employees' className="text-center bg-white px-2 py-0.5 m-2 w-96 focus:border-black focus:border-4">Employees</NavLink>
        </nav>
    )
}

export default NavBar;