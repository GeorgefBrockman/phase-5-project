import React from "react";
import NewCustomer from "../components/NewCustomer";
import NewTransaction from "../components/NewTransaction";
import NewItem from "../components/NewItem";
import "./Home.css"

function Home(){
    return(
        <div className="forms">
            <NewCustomer/>
            <NewTransaction/>
            <NewItem/>
        </div>
    )
}

export default Home