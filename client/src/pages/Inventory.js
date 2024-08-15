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
        <div className="flex justify-center p-2">
            <ul className="w-full bg-[#949494]">
                <div className="grid grid-cols-4 w-full p-2 bg-[#828282]">
                    <h3>ID:</h3>
                    <h3>Item Name:</h3>
                    <h3>Quantity:</h3>
                    <h3>Price:</h3>
                </div>
                {inventoryList}
            </ul>
        </div>
    )
}

export default Inventory;