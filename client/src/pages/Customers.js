import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Customer from "../components/Customer";

function Customers(){
    const {customers} = useContext(StoreContext)

    const sortedCustomers = customers.toSorted((a, b) => a.name - b.name);

    const customerList = sortedCustomers.map((customer) => {
        return(
            <Customer customer={customer} key={customer.id}/>
        )
    })

    return(
        <ul>
            {customerList}
        </ul>
    );
}

export default Customers;