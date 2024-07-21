import React, { useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { StoreContext } from "./StoreContext";

function NewTransaction(){
    const [refreshPage, setRefreshPage] = useState(false)
    const {setTransactions, customers, inventory} = useState(StoreContext)

    useEffect(() => {
        fetch("/transactions")
          .then(r => r.json())
          .then(r => {
            setTransactions(r);
          });
      }, [refreshPage]);

    yup.addMethod(yup.string, "custExists", (value) => {
        return (customers.some((customer) => customer.number == value))
    })

    yup.addMethod(yup.number, "itemExists", (value) => {
        return(inventory.some((item) => item.id == value))
    })

    const formSchema = yup.object().shape({
        item_id: yup.number().integer().itemExists("Item doesn't exist").required("Must enter an item id"),
        number: yup.string().custExists("Customer doesn't exist").required("Must enter a phone number").max(10)
    })

    const formik = useFormik({
        initialValues: {
            item_id: "",
            number: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const customerID = customers.find((customer) => customer.number == values.number).id

            const newValues = {
                date: new Date(),
                item_id: values.item_id,
                customer_id: customerID
            }

            fetch('/transactions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newValues, null, 2),
            }).then(r => {
                if(r.status == 200){
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })

    return(
        <></>
    )
}



export default NewTransaction