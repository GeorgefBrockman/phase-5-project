import React from "react";

function Transaction({transaction}){
    if(typeof transaction == "undefined") return(<h2>Loading...</h2>);

    const customer = transaction.customer ?? "N/A"

    return(
        <li className="grid grid-cols-6 w-full p2">
            <p className="px-0.5">{transaction.date.slice(0, 10)}</p>
            <p className="px-0.5">{transaction.item.name}</p>
            <p className="px-0.5">{`$${transaction.item.cost.toFixed(2)}`}</p>
            <p className="px-0.5">{transaction.employee.name}</p>
            <p className="px-0.5">{customer !== "N/A"? customer.name: "N/A"}</p>
            <p className="px-0.5 text-ellipsis overflow-hidden">{customer !== "N/A"? customer.email: "N/A"}</p>
        </li>
    )
}

export default Transaction;