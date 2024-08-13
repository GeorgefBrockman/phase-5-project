import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { StoreContext } from "./StoreContext";

function NewTransaction(){
    const {setTransactions, customers, transactions, employees, setEmployees, inventory} = useContext(StoreContext)

    const formSchema = yup.object().shape({
        item_id: yup.string().required("Must enter an item id"),
        number: yup.string().required("Must enter a phone number").max(10),
        employee_id: yup.string().required("Must enter an employee id")
    })

    const formik = useFormik({
        initialValues: {
            item_id: "",
            number: "",
            employee_id: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const customerID = customers.find((customer) => customer.number === values.number).id
            values.item_id = parseInt(values.item_id)
            values.employee_id = parseInt(values.employee_id)
            const value = inventory.find((item) => item.id === values.item_id).cost

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
            })
            .then(r => r.json())
            .then(r => {
                const newTransactions = [...transactions, r];
                setTransactions(newTransactions)
            })

            fetch(`/employees/${values.employee_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({value_sold: value})
            })
            .then(r => {
                if(r.status === 200){
                    fetch("/employees")
                    .then(r => r.json())
                    .then( r => {
                        setEmployees(r);
                    })
                }
            })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <h2 style={{"text-align": "center"}}>New Transaction</h2>
            <label htmlFor="item_id">Item ID: </label>
            <input id="item_id" name="item_id" onChange={formik.handleChange} value={formik.values.item_id}/>
            <p style={{color: "red"}}>{formik.errors.item_id}</p>

            <label htmlFor="number">Customer Phone: </label>
            <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
            <p style={{color: "red"}}>{formik.errors.number}</p>

            <label htmlFor="employee_id">Employee ID: </label>
            <input id="employee_id" name="employee_id" onChange={formik.handleChange} value={(formik.values.employee_id)}/>
            <p style={{color: "red"}}>{formik.errors.employee_id}</p>

            <button type="submit">Submit</button>
        </form>
    )
}

export default NewTransaction