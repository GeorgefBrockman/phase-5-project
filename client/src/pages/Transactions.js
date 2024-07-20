import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Transaction from "../components/Transaction"

function Transactions(){
    const {transactions} = useContext(StoreContext);

    const sortedTransactions = transactions.toSorted((a, b) => a.date - b.date);

    const transactionList = sortedTransactions.map((transaction) => {
        return <Transaction transaction={transaction} key={transaction.id}/>
    })

    return(
        <ul>
            {transactionList}
        </ul>
    )
}

export default Transactions;