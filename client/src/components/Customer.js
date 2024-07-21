import React, { useContext } from "react";
import { StoreContext } from "./StoreContext";

function Customer({customer}){
    const {customers, setCustomers} = useContext(StoreContext)

    if(typeof customer == 'undefined') return(<h2>Loading...</h2>);

    function handleDelete(e){
        fetch(`/customers/${customer.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(r => {
            if(r.delete_successful == true){
                const newCustomers = customers.filter((cust) => cust != customer)
                setCustomers(newCustomers)
            }
        })
    }
    
    return(
        <li>
            <p style={{gridColumn: 1}}>{customer.name}</p>
            <p style={{gridColumn: 2}}>{customer.email}</p>
            <p style={{gridColumn: 3}}>{customer.number}</p>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Customer;