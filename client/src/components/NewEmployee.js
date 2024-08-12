import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { StoreContext } from "./StoreContext";

function NewEmployee(){
    const {setEmployees, employees} = useContext(StoreContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('employees', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((r) => {
                const newEmployees = [...employees, r];
                setEmployees(newEmployees)
            })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <h2>New Employee</h2>
            <label htmlFor="name">Name: </label>
            <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            <p style={{color: "red"}}>{formik.errors.name}</p>
        </form>
    )
}

export default NewEmployee;