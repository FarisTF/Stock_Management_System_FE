import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

const CategoryEditPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/categories/${categoryId}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch category details");

                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };

        fetchCategoryDetails();
    }, [categoryId]);

    const handleSave = async () => {
        const updatedCategory = { name, description };

        try {
            const response = await fetch(
                `${API_BASE_URL}/categories/${categoryId}/update`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedCategory),
                }
            );

            if (!response.ok) throw new Error("Failed to update category");
            navigate("/categories");
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={[
                        { label: "Category List", url: "/categories" },
                        { label: "Edit Category", url: "" }, // Empty url for current page
                    ]}
                />
                <Typography variant="h3" gutterBottom>
                    Edit Category
                </Typography>
                <TextField
                    label="Category Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ ml: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default CategoryEditPage;
