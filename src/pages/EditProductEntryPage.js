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
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

const EditProductEntryPage = () => {
    const { productId } = useParams(); // Capture product ID from URL
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);

    // Fetch product details and categories when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/products/${productId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();
                setProductName(data.name);
                setImageLink(data.img_url);
                setCategory(data.category_id);
                setDescription(data.description);
                setPrice(data.price);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

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

        fetchProduct();
        fetchCategories();
    }, [productId]);

    // Handle save action for updating the product
    const handleSave = async () => {
        const updatedProductData = {
            name: productName,
            img_url: imageLink,
            category_id: category,
            description,
            price,
        };

        try {
            const response = await fetch(
                `${API_BASE_URL}/products/${productId}/update`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProductData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            navigate(`/products/${productId}`); // Navigate to product detail page
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={["Store List", "Store 1", "Edit Product"]}
                />
                <Typography variant="h3" gutterBottom>
                    Edit Product Entry
                </Typography>
                <Box my={2}>
                    <Typography variant="body1">
                        Product ID: <strong>{productId}</strong>
                    </Typography>
                </Box>
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
                    gap={2}
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
                    >
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default EditProductEntryPage;
