import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    CardMedia,
    Alert,
} from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useParams, useNavigate } from "react-router-dom";
import DeleteProductConfirmationDialog from "../components/DeleteProductConfirmationDialog";
import { API_BASE_URL } from "../config";

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        id: productId,
        name: "",
        category: "",
        description: "",
        price: "",
        img_url: "",
    });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/products/${productId}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch product details");

                const data = await response.json();
                setProduct({
                    id: data.id,
                    name: data.name,
                    category: data.category_id,
                    description: data.description,
                    price: `Rp${data.price}`,
                    img_url: data.img_url,
                });
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/products/${productId}/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete the product");
            }

            console.log("Product deleted:", productId);
            setDeleteDialogOpen(false); // Close the dialog after confirming
            navigate("/products"); // Navigate back to the main page after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
            setDeleteDialogOpen(false); // Close the delete dialog
            setErrorMessage(
                "Unable to delete the product. Please ensure all associated stock records are removed from all stores before deletion."
            ); // Set error message
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={[
                        { label: "Product List", url: "/products" },
                        {
                            label: `Product ${productId}`,
                            url: "",
                        },
                    ]}
                />

                {/* Display error message if it exists */}
                {errorMessage && (
                    <Alert severity="error" sx={{ my: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                <Typography variant="h3" gutterBottom>
                    {product.name} Detail
                </Typography>
                <Box display="flex" mx={4}>
                    <Box flex="1" mr={4}>
                        <Card sx={{ width: "100%", height: 400 }}>
                            <CardMedia
                                component="img"
                                image={
                                    product.img_url ||
                                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                }
                                alt={product.name}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Card>
                    </Box>

                    <Box flex="1">
                        <Typography variant="body1" gutterBottom>
                            <strong>Product ID:</strong> {product.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Category ID:</strong> {product.category}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Price:</strong> {product.price}
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            my={4}
                            gap={2}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    navigate(`/products/${productId}/edit`)
                                }
                            >
                                Edit Product
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteClick}
                            >
                                Delete Product
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Delete Confirmation Dialog */}
                <DeleteProductConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    productName={product.name}
                />
            </Container>
        </>
    );
};

export default ProductDetailPage;
