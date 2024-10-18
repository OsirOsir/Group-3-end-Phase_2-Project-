import React, { useEffect, useState } from 'react';
import CreateItem from './CreateItemForm';
import UpdateItem from './UpdateItemForm';
import DeleteItem from './DeleteItem';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);

    const fetchItems = async () => {
        const response = await fetch('/api/items_management');
        const data = await response.json();
        setItems(data);
    };

    const handleItemCreated = (newItem) => {
        setItems([...items, newItem]);
    };

    const handleItemUpdated = (updatedItem) => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setEditingItemId(null);
    };

    const handleItemDeleted = (itemId) => {
        setItems(items.filter(item => item.id !== itemId));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <CreateItem onItemCreated={handleItemCreated} />
            {items.map(item => (
                <div key={item.id}>
                    <h2>{item.item_name}</h2>
                    <p>{item.description}</p>
                    <p>Price: ksh{item.price}</p>
                    <button onClick={() => setEditingItemId(item.id)}>Edit</button>
                    <DeleteItem itemId={item.id} onItemDeleted={handleItemDeleted} />
                </div>
            ))}
            {editingItemId && <UpdateItem itemId={editingItemId} onItemUpdated={handleItemUpdated} />}
        </div>
    );
};

export default ItemList;