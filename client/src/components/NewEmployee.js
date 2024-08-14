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
        onSubmit: (values, {resetForm}) => {
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

            resetForm()
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <h2 className="text-center">New Employee</h2>
            <div className="flex flex-row p-1 w-full flex-initial">
                <label className="pr-1" htmlFor="name">Name: </label>
                <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            </div>
            <p style={{color: "red"}}>{formik.errors.name}</p>
            <button className="px-5 bg-white w-52 mt-2 ml-1" type="submit">Submit</button>
        </form>
    )
}

export default NewEmployee;