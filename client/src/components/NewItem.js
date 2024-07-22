import React, {useState, useEffect, useContext} from "react";
import { StoreContext } from "./StoreContext";
import { useFormik } from "formik";

function NewItem(){
    const [refreshPage, setRefreshPage] = useState(false)
    const {setInventory} = useContext(StoreContext)

    useEffect(() => {
        fetch('/inventory')
        .then(r => r.json())
        .then(r => {
            setInventory(r)
        })
    }, [refreshPage])

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
            }).then((r) => {
                if(r.status == 201){
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <h2 style={{"text-align": "center"}}>New Item</h2>
            <label htmlFor="name">Name: </label>
            <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            <br/>
            <br/>

            <label htmlFor="quantity">Quantity: </label>
            <input id="quantity" name="quantity" onChange={formik.handleChange} value={formik.values.quantity}/>
            <br/>
            <br/>

            <label htmlFor="cost">Cost: </label>
            <input id="cost" name="cost" onChange={formik.handleChange} value={formik.values.cost}/>
            <br/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewItem