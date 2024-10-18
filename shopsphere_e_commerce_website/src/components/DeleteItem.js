import React from 'react';

const DeleteItem = ({ itemId, onItemDeleted }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/items_management/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onItemDeleted(itemId);
            } else {
                const error = await response.json();
                alert(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
        }
    };

    return (
        <button onClick={handleDelete}>Delete Item</button>
    );
};

export default DeleteItem;