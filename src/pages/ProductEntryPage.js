import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
} from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const ProductEntryPage = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]); // State to store categories

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/categories`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data); // Store categories in state
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSave = async () => {
        // Prepare the product data as JSON
        const productData = {
            name: productName,
            img_url: imageLink,
            category_id: category,
            description,
            price,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/products/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Failed to save the product");
            }

            // Redirect back to the stock operational page
            navigate(-1);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={["Store List", "Store 1", "Add New Product"]}
                />
                <Typography variant="h3" gutterBottom>
                    New Product Entry
                </Typography>
                <TextField
                    label="Product Name"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Image Link"
                    fullWidth
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Price"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                        Add New Product
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default ProductEntryPage;
