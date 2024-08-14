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
        <li className="grid grid-cols-5 w-full p-2">
            <p className="px-0.5">{employee.id}</p>
            <p className="px-0.5">{employee.name}</p>
            <p className="px-0.5">{employee.items_sold}</p>
            <p className="px-0.5">{`$${employee.value_sold.toFixed(2)}`}</p>
            <button className="bg-white mx-1" onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Employee;