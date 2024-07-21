import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { StoreContext } from "./StoreContext";

function NewTransaction(){
    const [refreshPage, setRefreshPage] = useState(false)
    const {setTransactions, customers, inventory} = useContext(StoreContext)

    useEffect(() => {
        fetch("/transactions")
          .then(r => r.json())
          .then(r => {
            setTransactions(r);
          });
      }, [refreshPage]);

    const formSchema = yup.object().shape({
        item_id: yup.string().required("Must enter an item id"),
        number: yup.string().required("Must enter a phone number").max(10)
    })

    const formik = useFormik({
        initialValues: {
            item_id: "",
            number: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const customerID = customers.find((customer) => customer.number == values.number).id
            values.item_id = parseInt(values.item_id)

            const newValues = {
                item_id: values.item_id,
                customer_id: customerID
            }

            fetch('/transactions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newValues),
            }).then(r => {
                if(r.status == 200){
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="item_id">Item ID</label>
            <input id="item_id" name="item_id" onChange={formik.handleChange} value={formik.values.item_id}/>
            <p style={{color: "red"}}>{formik.errors.item_id}</p>

            <label htmlFor="number">Phone Number</label>
            <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
            <p style={{color: "red"}}>{formik.errors.number}</p>

            <button type="submit">Submit</button>
        </form>
    )
}

export default NewTransaction