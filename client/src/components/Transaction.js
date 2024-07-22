import React from "react";
import "./Transaction.css"

function Transaction({transaction}){
    if(typeof transaction == "undefined") return(<h2>Loading...</h2>);

    const customer = transaction.customer ?? "N/A"

    return(
        <li className="transaction">
            <p style={{gridColumn: 1}}>{transaction.date.slice(0, 10)}</p>
            <p style={{gridColumn: 2}}>{transaction.item.name}</p>
            <p style={{gridColumn: 3}}>{`$${transaction.item.cost.toFixed(2)}`}</p>
            <p style={{gridColumn: 4}}>{customer !== "N/A"? customer.name: "N/A"}</p>
            <p style={{gridColumn: 5}}>{customer !== "N/A"? customer.email: "N/A"}</p>
        </li>
    )
}

export default Transaction;