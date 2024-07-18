import { createContext, useEffect, useState } from 'react';

const StoreContext = createContext();

function StoreProvider({children}){
    const [inventory, setInventory] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([])

    const store = {
        inventory: inventory,
        setInventory: setInventory,
        customers: customers,
        setCustomers: setCustomers,
        transactions: transactions,
        setTransactions: setTransactions
    };

    useEffect(() => {
        fetch('/inventory')
        .then(r => r.json())
        .then(r => setInventory(r));

        fetch('/customers')
        .then(r => r.json())
        .then(r => setCustomers(r));

        fetch('/transactions')
        .then(r => r.json())
        .then(r => setTransactions(r));
    }, []);

    return(
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}

export {StoreProvider, StoreContext};