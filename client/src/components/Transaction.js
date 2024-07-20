import React from "react";

function Transaction({transaction}){
    if(typeof transaction == "undefined") return(<h2>Loading...</h2>);

    return(
        <li className="transaction">
            <p style={{gridColumn: 1}}>{transaction.date}</p>
            <p style={{gridColumn: 2}}>{transaction.item.name}</p>
            <p style={{gridColumn: 3}}>{transaction.item.cost}</p>
            <p style={{gridColumn: 4}}>{transaction.customer.name}</p>
            <p style={{gridColumn: 5}}>{transaction.customer.email}</p>
        </li>
    )
}

export default Transaction;