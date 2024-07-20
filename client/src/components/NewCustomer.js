import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { StoreContext } from "./StoreContext";

function NewCustomer(){
    const [refreshPage, setRefreshPage] = useState(false)
    const {customers, setCustomers} = useState(StoreContext)

    useEffect(() => {
        fetch("/customers")
          .then(r => r.json())
          .then(r => {
            setCustomers(r);
          });
      }, [refreshPage]);

    yup.addMethod(yup.string, 'numerical', function () {
        return this.matches(/^\d+$/, 'Number should have digits only')
      })

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        number: yup.string().numerical().required("Must enter a number").max(10),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/customers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if(r.status == 200){
                    setRefreshPage(!refreshPage);
                }
            })
        }
    })

    return(
        <form onSubmit={formik.onSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            <p style={{color: "red"}}>{formik.errors.name}</p>

            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
            <p style={{color: "red"}}>{formik.errors.email}</p>

            <label htmlFor="number">Phone Number</label>
            <input id="number" name="number" onChange={formik.handleChange} value={formik.values.number}/>
            <p style={{color: "red"}}>{formik.errors.number}</p>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewCustomer;