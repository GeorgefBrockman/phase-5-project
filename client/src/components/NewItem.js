import React, { useContext } from "react";
import { StoreContext } from "./StoreContext";
import { useFormik } from "formik";

function NewItem(){
    const {setInventory, inventory} = useContext(StoreContext)

    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",
            cost: "",
        },
        onSubmit: (values) => {
            values.quantity = parseInt(values.quantity)
            values.cost = parseFloat(values.cost)

            fetch('inventory', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then(r => {
                const newItems = [...inventory, r];
                setInventory(newItems)
            })
        }
    })

    return(
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">New Item</h2>
            <div className="flex flex-row p-1 w-full flex-initial">
                <label className="pr-1" htmlFor="name">Name: </label>
                <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            </div>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="quantity">Quantity: </label>
                <input id="quantity" name="quantity" onChange={formik.handleChange} value={formik.values.quantity}/>
            </div>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="cost">Cost: </label>
                <input id="cost" name="cost" onChange={formik.handleChange} value={formik.values.cost}/>
            </div>

            <button className="px-5 bg-white w-52 mt-2 ml-1" type="submit">Submit</button>
        </form>
    )
}

export default NewItem