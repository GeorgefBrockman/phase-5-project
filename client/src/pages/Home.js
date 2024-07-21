import React from "react";
import NewCustomer from "../components/NewCustomer";
import NewTransaction from "../components/NewTransaction";

function Home(){
    return(
        <>
            <NewCustomer/>
            <NewTransaction/>
        </>
    )
}

export default Home