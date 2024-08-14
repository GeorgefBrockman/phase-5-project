import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Customer from "../components/Customer";

function Customers(){
    const {customers} = useContext(StoreContext)

    const sortedCustomers = customers.toSorted((a, b) => (a.name > b.name) ? 1 : -1);

    const customerList = sortedCustomers.map((customer) => {
        return(
            <Customer customer={customer} key={customer.id}/>
        )
    })

    return(
        <div className="flex justify-center p-2">
            <ul className="w-full bg-[#949494]">
                <div className="grid grid-cols-7 w-full p-2">
                    <h3 className="col-span-2">Name:</h3>
                    <h3 className="col-span-2">Email:</h3>
                    <h3>Number:</h3>
                    <h3>Delete:</h3>
                    <h3>Edit:</h3>
                </div>
                {customerList}
            </ul>
        </div>
    );
}

export default Customers;