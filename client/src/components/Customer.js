import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { StoreContext } from "./StoreContext";

function Customer({customer}){
    const {customers, setCustomers} = useContext(StoreContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        number: yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Must enter a number").max(10),
    })

    const formik = useFormik({
        initialValues: {
            name: customer.name,
            email: customer.email,
            number: customer.number,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/customers/${customer.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if(r.status === 200){
                    fetch("/customers")
                    .then(r => r.json())
                    .then(r => {
                        setCustomers(r);
                    });
                }
            })
        }
    })

    function handleDelete(){
        fetch(`/customers/${customer.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(r => {
            if(r.delete_successful === true){
                const newCustomers = customers.filter((cust) => cust !== customer)
                setCustomers(newCustomers)
            }
        })
    }

    function handleEdit(e){
        if(e.target.nextSibling.hidden){
            e.target.nextSibling.hidden = false
        }else{
            e.target.nextSibling.hidden = true
        }
    }

    if(typeof customer == 'undefined') return(<h2>Loading...</h2>);
    
    return(
        <li className="grid grid-cols-7 w-full p-2">
            <p className="col-span-2 px-0.5">{customer.name}</p>
            <p className="text-ellipsis overflow-hidden col-span-2 px-0.5">{customer.email}</p>
            <p className="px-0.5">{customer.number}</p>
            <button className="bg-white mx-1" onClick={handleDelete}>Delete</button>

            <button className="bg-white mx-1" onClick={handleEdit}>Edit</button>
            
            <div className="col-span-7" hidden>
                <form className="grid grid-cols-7 w-full p-0.5" onSubmit={formik.handleSubmit} hidden>
                    <div className="col-span-2">
                        <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
                        <p className="px-1 text-red-700">{formik.errors.name}</p>
                    </div>

                    <div className="col-span-2 p-0.5">
                        <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                        <p className="px-1 text-red-700">{formik.errors.email}</p>
                    </div>

                    <div>
                        <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
                        <p className="px-1 text-red-700">{formik.errors.number}</p>
                    </div>
                    <button className="col-start-7 m-1 bg-white" type="submit">Submit</button>
                </form>
            </div>
        </li>
    )
}

export default Customer;