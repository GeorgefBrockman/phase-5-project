import React, { useContext, useState, useEffect } from "react";
import { useFormik } from 'formik';
import { StoreContext } from "./StoreContext";
import "./Item.css";

function Item({item}){
    const {setInventory} = useContext(StoreContext)

    const formik = useFormik({
        initialValues: {
            quantity: item.quantity,
        },
        onSubmit: (values) => {
            values.quantity = parseInt(values.quantity)

            fetch(`inventory/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if(r.status == 200){
                    fetch("inventory")
                    .then(r => r.json())
                    .then(r =>{
                        setInventory(r);
                    })
                }
            })
        }
    })

    function handleEdit(e){
        if(e.target.nextSibling.hidden){
            e.target.nextSibling.hidden = false
        }else{
            e.target.nextSibling.hidden = true
        }
    }

    if(typeof item == "undefined") return(<h2>Loading...</h2>);

    return(
        <li className="item">
            <p style={{gridColumn: 1}}>{item.name}</p>
            <div style={{gridColumn: 2}}>
                <p>{item.quantity}</p>
                <button onClick={handleEdit}>Edit</button>
                <form onSubmit={formik.handleSubmit} hidden>
                    <input id="quantity" name="quantity" onChange={formik.handleChange} value={formik.values.quantity}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <p style={{gridColumn: 3}}>{`$${item.cost.toFixed(2)}`}</p>
        </li>
    )
}

export default Item;