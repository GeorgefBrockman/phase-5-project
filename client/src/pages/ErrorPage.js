import React from "react";
import NavBar from "../components/NavBar";

function ErrorPage(){
    return (
        <>
            <header>
                <NavBar/>
            </header>
            <h1>Oops! It looks like something went wrong. Please return to the previous page.</h1>
        </>
    )
}

export default ErrorPage;