import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Transaction from "../components/Transaction"
import './Transactions.css'

function Transactions(){
    const {transactions} = useContext(StoreContext);

    const sortedTransactions = transactions.toSorted((a, b) => (a.date < b.date) ? 1 : -1);

    const transactionList = sortedTransactions.map((transaction) => {
        return <Transaction transaction={transaction} key={transaction.id}/>
    })

    return(
        <ul>
            <div className="titles">
                <h3>Date:</h3>
                <h3>Item Name:</h3>
                <h3>Cost:</h3>
                <h3>Customer:</h3>
                <h3>Customer Email:</h3>
            </div>
            {transactionList}
        </ul>
    )
}

export default Transactions;