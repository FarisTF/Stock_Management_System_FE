import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const NewCategoryPage = () => {
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = async () => {
        // Prepare the category data as JSON
        const categoryData = {
            name: categoryName,
            description,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/categories/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                throw new Error("Failed to save the category");
            }

            // Redirect back to the category list page
            navigate("/categories");
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Category List", "Add New Category"]} />
                <Typography variant="h3" gutterBottom>
                    New Category Entry
                </Typography>
                <TextField
                    label="Category Name"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ my: 3, mb: 5 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Add New Category
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default NewCategoryPage;
