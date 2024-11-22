import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Box,Grid2} from "@mui/material";
import MainPage from "./components/MainPage";
import { useTodos } from "./hooks/useTodos";
function App() {
    const { todos, setTodos, loading, error } = useTodos();
    const toggleStatus =(changedTodo)=>{
        setTodos(todos.map(todo=> todo._id == changedTodo._id ? {...todo,status:!changedTodo.status}:{...todo}));
    }
    return (
        <>
            <Grid2 container spacing={2}>
                <Sidebar setTodos={setTodos}/>
                <MainPage todos={todos} loading={loading} setTodos={setTodos}/>
            </Grid2>
        </>
    );
}

export default App;
