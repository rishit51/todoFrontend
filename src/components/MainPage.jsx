import React from "react";
import { Box, Paper, TextField, Grid2, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import TodoCard from "./Todo";

const MainPage = ({ todos ,loading,setTodos}) => {
    const onDelete = async (toDeleteTodo)=>{
       
       const response = await fetch(`http://localhost:3000/todos/${toDeleteTodo._id}`,{method:'DELETE'});
       if(!response.ok){
        return;
       }
       const data = response.json();
       setTodos(todos.filter(todo=>todo._id !== toDeleteTodo._id));
    }

    return (
       loading ? (
        <div>Loading...</div>
       ):(
        <Grid2 container size={9} bgcolor={'#062440'} height={'100vh'}>
           { todos.map(todo=>(<Grid2 size={3}>
                <TodoCard todo={todo} onDelete={
onDelete                } onToggleStatus={()=>{}}></TodoCard>
            </Grid2>))}
        </Grid2>
       )
    );
};

export default MainPage;
