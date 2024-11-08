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
import DeleteStoreConfirmationDialog from "../components/DeleteStoreConfirmationDialog"; // Make sure to create this similar to DeleteProductConfirmationDialog
import { API_BASE_URL } from "../config";

const StoreDetailPage = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState({
        id: storeId,
        name: "",
        description: "",
        address: "",
        phone_number: "",
        img_url: "",
    });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/stores/${storeId}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch store details");

                const data = await response.json();
                setStore({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    phone_number: data.phone_number,
                    img_url: data.img_url,
                });
            } catch (error) {
                console.error("Error fetching store details:", error);
            }
        };

        fetchStoreDetails();
    }, [storeId]);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/delete`,
                { method: "DELETE" }
            );

            if (!response.ok) throw new Error("Failed to delete the store");

            console.log("Store deleted:", storeId);
            setDeleteDialogOpen(false);
            navigate("/"); // Redirect back to the store list after deletion
        } catch (error) {
            console.error("Error deleting store:", error);
            setDeleteDialogOpen(false);
            setErrorMessage(
                "Unable to delete the store. Ensure all associated records are removed before deletion."
            );
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
                    paths={["Store List", store.name, "Store Detail"]}
                />

                {errorMessage && (
                    <Alert severity="error" sx={{ my: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                <Typography variant="h3" gutterBottom>
                    {store.name} Detail
                </Typography>
                <Box display="flex" mx={4}>
                    <Box flex="1" mr={4}>
                        <Card sx={{ width: "100%", height: 400 }}>
                            <CardMedia
                                component="img"
                                image={
                                    store.img_url ||
                                    "https://via.placeholder.com/400"
                                }
                                alt={store.name}
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
                            <strong>Store ID:</strong> {store.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Description:</strong> {store.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Address:</strong> {store.address}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Phone Number:</strong> {store.phone_number}
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
                                    navigate(`/store/${storeId}/edit`)
                                }
                            >
                                Edit Store
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteClick}
                            >
                                Delete Store
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <DeleteStoreConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    entityName={store.name}
                />
            </Container>
        </>
    );
};

export default StoreDetailPage;
