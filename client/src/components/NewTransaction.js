import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { StoreContext } from "./StoreContext";

function NewTransaction(){
    const {setTransactions, customers, transactions, setEmployees, inventory} = useContext(StoreContext)

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
        onSubmit: (values, {resetForm}) => {
            const customerID = customers.find((customer) => customer.number === values.number).id
            values.item_id = parseInt(values.item_id)
            const value = inventory.find((item) => item.id === values.item_id).cost

            const newValues = {
                item_id: values.item_id,
                customer_id: customerID,
                employee_id: values.employee_id
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

            resetForm()
        }
    })

    return(
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">New Transaction</h2>
            <div className="flex flex-row p-1 w-full flex-initial">
                <label className="pr-1" htmlFor="item_id">Item ID: </label>
                <input id="item_id" name="item_id" onChange={formik.handleChange} value={formik.values.item_id}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.item_id}</p>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="number">Customer Phone: </label>
                <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.number}</p>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="employee_id">Employee ID: </label>
                <input id="employee_id" name="employee_id" onChange={formik.handleChange} value={(formik.values.employee_id)}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.employee_id}</p>

            <button className="px-5 bg-white w-52 mt-2 ml-1" type="submit">Submit</button>
        </form>
    )
}

export default NewTransaction