import React, { useState, useEffect } from 'react';

const UpdateItem = ({ itemId, onItemUpdated }) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(`/api/items_management/${itemId}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data);
            } else {
                alert('Failed to fetch item.');
            }
        };
        fetchItem();
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(item).some(value => value.trim() === '')) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`/api/items_management/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                onItemUpdated(updatedItem);
            } else {
                const error = await response.json();
                alert(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Failed to update item.');
        }
    };

    if (!item) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="item_name" value={item.item_name} onChange={handleChange} required />
            <input type="text" name="description" value={item.description} onChange={handleChange} required />
            <input type="number" name="price" value={item.price} onChange={handleChange} required />
            <input type="text" name="category" value={item.category} onChange={handleChange} required />
            <input type="number" name="items_available" value={item.items_available} onChange={handleChange} required />
            <input type="text" name="image_url" value={item.image_url} onChange={handleChange} required />
            <button type="submit">Update Item</button>
        </form>
    );
};

export default UpdateItem;