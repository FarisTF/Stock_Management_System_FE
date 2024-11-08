import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Container,
    Button,
    Box,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { API_BASE_URL } from "../config";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data); // Set fetched product data to state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddNewProduct = () => {
        navigate("/products/new");
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Product List"]} />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Typography variant="h3" gutterBottom>
                        Product List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewProduct}
                    >
                        <AddIcon sx={{ mr: 0.5, ml: -1 }} />
                        Add New Product
                    </Button>
                </Box>
                <Grid container spacing={2} sx={{ mb: 5 }}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard
                                productId={product.id}
                                productName={product.name}
                                productDescription={product.description}
                                productImage={
                                    product.img_url ||
                                    "https://via.placeholder.com/150" // Default image if img_url is empty
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

// ProductCard component
const ProductCard = ({
    productId,
    productName,
    productDescription,
    productImage,
}) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/products/${productId}`)}
            sx={{
                maxWidth: 345,
                height: 400,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                textDecoration: "none",
            }}
        >
            <CardMedia
                component="img"
                height="250" // Fixed height for image
                image={productImage}
                alt={`${productName} image`}
            />
            <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    {productName}
                </Typography>
                <Box
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3, // Limits to 3 lines before truncating
                    }}
                >
                    <Typography variant="body1" component="div">
                        {productDescription}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductListPage;
