import React, { useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { StoreContext } from "./StoreContext";

function NewTransaction(){
    const [refreshPage, setRefreshPage] = useState(false)
    const {setTransactions} = useState(StoreContext)

    useEffect(() => {
        fetch("/transactions")
          .then(r => r.json())
          .then(r => {
            setTransactions(r);
          });
      }, [refreshPage]);

    return(
        <></>
    )
}



export default NewTransaction