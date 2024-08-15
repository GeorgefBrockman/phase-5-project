import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Employee from "../components/Employee"
import NewEmployee from "../components/NewEmployee";

function Employees(){
    const {employees} = useContext(StoreContext);

    const sortedEmployees = employees.toSorted((a, b) => (a.id > b.id) ? 1 : -1);

    const employeeList = sortedEmployees.map((employee) => {
        return(
            <Employee employee={employee} key={employee.id}/>
        )
    })

    return(
        <div>
            <div className="flex justify-center p-2">
                <NewEmployee/>
            </div>
            
            <div className="flex justify-center p-2">
                <ul className="w-full bg-[#949494]">
                    <div className="grid grid-cols-5 w-full p-2 bg-[#828282]">
                        <h3>ID:</h3>
                        <h3>Name:</h3>
                        <h3>Items Sold:</h3>
                        <h3>Value Sold:</h3>
                        <h3>Delete: </h3>
                    </div>
                    {employeeList}
                </ul>
            </div>
        </div>
    )
}

export default Employees;