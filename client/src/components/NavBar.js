import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar(){
    return(
        <nav className="nav-bar">
            <NavLink to='/' className={'nav-link'}>Home</NavLink>
            <NavLink to='/customers' className={'nav-link'}>Customers</NavLink>
            <NavLink to='/transactions' className={'nav-link'}>Transactions</NavLink>
            <NavLink to='/inventory' className={'nav-link'}>Inventory</NavLink>
        </nav>
    )
}

export default NavBar;