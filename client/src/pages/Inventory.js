import { useContext } from "react";
import { StoreContext } from "../components/StoreContext";
import Item from "../components/Item"

function Inventory(){
    const {inventory} = useContext(StoreContext)

    const sortedInventory = inventory.toSorted((a, b) => a.name - b.name);

    const inventoryList = sortedInventory.map((item) => {
        return(<Item item={item} key={item.id}/>)
    })
    
    return(
        <ul>
            {inventoryList}
        </ul>
    )
}

export default Inventory;