import React, { useContext } from "react";
import { StoreContext } from "./StoreContext";

function Employee({employee}){
    const {employees, setEmployees} = useContext(StoreContext)

    function handleDelete(){
        fetch(`/employees/${employee.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(r => {
            if(r.delete_successful === true){
                const newEmployees = employees.filter((emp) => emp !== employee)
                setEmployees(newEmployees)
            }
        })
    }

    if(typeof employee == 'undefined') return(<h2>Loading...</h2>);

    return(
        <li>
            <p>{employee.id}</p>
            <p>{employee.name}</p>
            <p>{employee.items_sold}</p>
            <p>{employee.value_sold}</p>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Employee;