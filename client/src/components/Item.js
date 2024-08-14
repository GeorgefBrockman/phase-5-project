import React, { useContext } from "react";
import { useFormik } from 'formik';
import { StoreContext } from "./StoreContext";

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
                if(r.status === 200){
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
        <li className="grid grid-cols-4 w-full p-2">
            <p className="px-0.5">{item.id}</p>
            <p className="px-0.5">{item.name}</p>
            <div className="px-0.5">
                <p>{item.quantity}</p>
                <button className="bg-white mx-1 w-20" onClick={handleEdit}>Edit</button>
                <form className="py-0.5" onSubmit={formik.handleSubmit} hidden>
                    <input id="quantity" name="quantity" onChange={formik.handleChange} value={formik.values.quantity}/>
                    <button className="bg-white mx-1" type="submit">Submit</button>
                </form>
            </div>
            <p className="px-0.5">{`$${item.cost.toFixed(2)}`}</p>
        </li>
    )
}

export default Item;