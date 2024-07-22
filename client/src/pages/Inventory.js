import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Item from "../components/Item"
import './Inventory.css'

function Inventory(){
    const {inventory} = useContext(StoreContext)

    const sortedInventory = inventory.toSorted((a, b) => a.name - b.name);

    const inventoryList = sortedInventory.map((item) => {
        return(<Item item={item} key={item.id}/>)
    })
    
    return(
        <ul>
            <div className="item-titles">
                <h3>Item Name:</h3>
                <h3>Quantity:</h3>
                <h3>Price:</h3>
            </div>
            {inventoryList}
        </ul>
    )
}

export default Inventory;