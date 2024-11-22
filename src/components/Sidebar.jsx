import React from 'react';
import { Container, Typography, Stack, TextField, Divider, Button, Grid2 } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Sidebar = ({ setTodos }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .max(50, 'Title cannot exceed 50 characters'),
            description: Yup.string()
                .max(200, 'Description cannot exceed 200 characters'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Optimistic update: Add Todo locally first
                setTodos((prev) => [
                    ...prev,
                    { title: values.title, description: values.description, status: false },
                ]);
                console.log(JSON.stringify({
                    title: values.title,
                    description: values.description,
                    status: false,
                }))
                // Make POST request to the server
                const response = await fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: values.title,
                        description: values.description,
                        status: false,
                    }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add Todo');
                }
        
                // Parse response
                const data = await response.json();
        
                // Update Todos with server response
                setTodos(data.todos);
        
                // Clear form after successful submission
                resetForm();
            } catch (error) {
                console.error('Error submitting Todo:', error.message);
            }}        
    });

    return (
        <Grid2  size={3} style={{ minHeight: '100vh', backgroundColor: '#FF7D17' }}>
            <Container>
                <Typography variant="h4"  sx={{ mt: 5 }} align="center">
                    Todo List
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4} sx={{ mt: 4 }}>
                        <TextField
                            id="title"
                            name="title"
                            placeholder="Enter Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.title && formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <Divider />
                        <TextField
                            id="description"
                            name="description"
                            multiline
                            placeholder="Enter Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            
                        />
                        <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Grid2>
    );
};

export default Sidebar;
