import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Transaction from "../components/Transaction"

function Transactions(){
    const {transactions} = useContext(StoreContext);

    const sortedTransactions = transactions.toSorted((a, b) => (a.date < b.date) ? 1 : -1);

    const transactionList = sortedTransactions.map((transaction) => {
        return <Transaction transaction={transaction} key={transaction.id}/>
    })

    return(
        <div className="flex justify-center p-2">
            <ul className="w-full bg-[#949494]">
                <div className="grid grid-cols-6 w-full p-2 bg-[#828282]">
                    <h3>Date:</h3>
                    <h3>Item Name:</h3>
                    <h3>Cost:</h3>
                    <h3>Employee:</h3>
                    <h3>Customer:</h3>
                    <h3>Customer Email:</h3>
                </div>
                {transactionList}
            </ul>
        </div>
    )
}

export default Transactions;