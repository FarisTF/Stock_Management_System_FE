import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, Button, Box } from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import StoreCard from "../components/StoreCard";
import { API_BASE_URL } from "../config";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const StoreListPage = () => {
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/stores`);
                if (!response.ok) throw new Error("Failed to fetch stores");
                const data = await response.json();
                setStores(data); // Set fetched store data to state
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };

        fetchStores();
    }, []);

    const handleAddNewStore = () => {
        navigate("/newstore");
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Store List"]} />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Typography variant="h3" gutterBottom>
                        Store List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewStore}
                    >
                        <AddIcon sx={{ mr: 0.5, ml: -1 }} />
                        Add New Store
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {stores.map((store) => (
                        <Grid item xs={12} sm={6} md={4} key={store.id}>
                            <StoreCard
                                storeId={store.id}
                                storeName={store.name}
                                storeDescription={store.description}
                                storeImage={
                                    store.img_url ||
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

export default StoreListPage;
