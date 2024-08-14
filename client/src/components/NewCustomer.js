import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { StoreContext } from "./StoreContext";

function NewCustomer(){
    const {setCustomers, customers} = useContext(StoreContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        number: yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Must enter a number").max(10),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('customers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then(r => {
                const newCustomers = [...customers, r];
                setCustomers(newCustomers)
            })

            resetForm()
        }
    })

    return(
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">New Customer</h2>
            <div className="flex flex-row p-1 w-full flex-initial">
                <label className="pr-1" htmlFor="name">Name: </label>
                <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.name}</p>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="email">Email Address: </label>
                <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.email}</p>

            <div className="flex flex-row p-1">
                <label className="pr-1" htmlFor="number">Phone Number: </label>
                <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
            </div>
            <p className="px-1 text-red-700">{formik.errors.number}</p>
            <button className="px-5 bg-white w-52 mt-2 ml-1" type="submit">Submit</button>
        </form>
    )
}

export default NewCustomer;