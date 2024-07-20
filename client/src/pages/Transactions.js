import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Transaction from "../components/Transaction"

function Transactions(){
    const {transactions} = useContext(StoreContext);

    const transactionList = transactions.map((transaction) => {
        return <Transaction transaction={transaction}/>
    })

    return(
        <ul>
            {transactionList}
        </ul>
    )
}

export default Transactions;