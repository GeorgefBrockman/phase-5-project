import React from "react";
import NewCustomer from "../components/NewCustomer";
import NewTransaction from "../components/NewTransaction";
import NewItem from "../components/NewItem";

function Home(){
    return(
        <div className="flex justify-center p-4">
            <div className="p-4 w-full grid grid-cols-3 bg-[#949494]">
                <NewCustomer/>
                <NewTransaction/>
                <NewItem/>
            </div>
        </div>
    )
}

export default Home