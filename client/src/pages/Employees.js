import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Employee from "../components/Employee"

function Employees(){
    const {employees} = useContext(StoreContext);

    const sortedEmployees = employees.toSorted((a, b) => (a.name > b.name) ? 1 : -1);

    const employeeList = sortedEmployees.map((employee) => {
        return(
            <Employee employee={employee} key={employee.id}/>
        )
    })

    return(
        <ul>
            <div>
                <h3>ID:</h3>
                <h3>Name:</h3>
                <h3>Items Sold:</h3>
                <h3>Value Sold:</h3>
            </div>
            {employeeList}
        </ul>
    )
}

export default Employees;