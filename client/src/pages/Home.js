import React from "react";
import NewCustomer from "../components/NewCustomer";
import NewTransaction from "../components/NewTransaction";
import NewItem from "../components/NewItem";

function Home(){
    return(
        <>
            <NewCustomer/>
            <NewTransaction/>
            <NewItem/>
        </>
    )
}

export default Home