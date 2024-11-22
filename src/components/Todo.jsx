import React from "react";
import { Card, CardContent, CardActions, Typography, Checkbox, Button, Stack } from "@mui/material";

const TodoCard = ({ todo, onToggleStatus, onDelete }) => {
    const { title, description, status, createdAt, updatedAt } = todo;

    return (
        <Card sx={{ maxWidth: 400, margin: 2, backgroundColor: status ? "#e0f7fa" : "#fff8e1" }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
                    Created on: {new Date(createdAt).toLocaleDateString()} {updatedAt && `(Updated on: ${new Date(updatedAt).toLocaleDateString()})`}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" spacing={2}>
                    <Checkbox
                        checked={status}
                        onChange={() => onToggleStatus(todo)}
                        inputProps={{ "aria-label": "Toggle Status" }}
                    />
                    <Typography variant="body2">{status ? "Completed" : "Incomplete"}</Typography>
                    <Button variant="contained" color="error" onClick={() => onDelete(todo)}>
                        Delete
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default TodoCard;
