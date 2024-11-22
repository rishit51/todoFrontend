import { useState, useEffect } from "react";

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/todos/");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Fetched Todos:", data); // Debugging
                setTodos(Array.isArray(data.todos) ? data.todos : []); // Ensure todos is an array
            } catch (err) {
                console.error("Fetch Error:", err.message); // Debugging
                setError(err.message);
                setTodos([]); // Reset todos on error
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    return { todos, loading, error, setTodos };
}
