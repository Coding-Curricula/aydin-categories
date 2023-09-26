import React, { useState, useEffect } from 'react';

const API_ENDPOINT = "https://aydin-4-9-deployment.onrender.com/categories";

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setCategories(data);
    };

    const handleCreate = async () => {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            fetchCategories();
            setName('');
        }
    };

    const handleUpdate = async () => {
        if (!selectedCategory) return;

        const response = await fetch(`${API_ENDPOINT}/${selectedCategory.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            fetchCategories();
            setName('');
            setSelectedCategory(null);
        }
    };

    const handleDelete = async (categoryId) => {
        const response = await fetch(`${API_ENDPOINT}/${categoryId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchCategories();
        }
    };

    return (
        <div className="App">
            <h1>Category CRUD</h1>

            <div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                />

                {selectedCategory ? (
                    <button onClick={handleUpdate}>Update</button>
                ) : (
                    <button onClick={handleCreate}>Create</button>
                )}
            </div>

            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                        <button onClick={() => {
                            setName(category.name);
                            setSelectedCategory(category);
                        }}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
