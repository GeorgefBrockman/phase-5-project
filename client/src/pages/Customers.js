import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Customer from "../components/Customer";
import "./Customers.css"

function Customers(){
    const {customers} = useContext(StoreContext)

    const sortedCustomers = customers.toSorted((a, b) => (a.name > b.name) ? 1 : -1);

    const customerList = sortedCustomers.map((customer) => {
        return(
            <Customer customer={customer} key={customer.id}/>
        )
    })

    return(
        <ul>
            <div className="titles">
                <h3>Name:</h3>
                <h3>Email:</h3>
                <h3>Number:</h3>
                <h3>Delete:</h3>
                <h3>Edit:</h3>
            </div>
            {customerList}
        </ul>
    );
}

export default Customers;