import React from "react";

function Item({item}){
    if(typeof item == "undefined") return(<h2>Loading...</h2>);

    return(
        <li>
            <p style={{gridColumn: 1}}>{item.name}</p>
            <p style={{gridColumn: 2}}>{item.quantity}</p>
            <p style={{gridColumn: 3}}>{item.cost}</p>
        </li>
    )
}

export default Item;