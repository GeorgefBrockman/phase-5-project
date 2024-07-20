import React from "react";

function Customer({customer}){
    if(typeof customer == 'undefined') return(<h2>Loading...</h2>);
    
    return(
        <li>
            <p style={{gridColumn: 1}}>{customer.name}</p>
            <p style={{gridColumn: 2}}>{customer.email}</p>
            <p style={{gridColumn: 3}}>{customer.number}</p>
        </li>
    )
}

export default Customer;