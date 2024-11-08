import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const StoreEditPage = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imageLink, setImageLink] = useState("");

    // Fetch store data on component mount
    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/stores/${storeId}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch store details");

                const data = await response.json();
                setStoreName(data.name);
                setDescription(data.description);
                setAddress(data.address);
                setPhoneNumber(data.phone_number);
                setImageLink(data.img_url);
            } catch (error) {
                console.error("Error fetching store details:", error);
            }
        };

        fetchStoreDetails();
    }, [storeId]);

    const handleSave = async () => {
        const updatedStoreData = {
            name: storeName,
            description,
            address,
            phone_number: phoneNumber,
            img_url: imageLink,
        };

        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/update`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedStoreData),
                }
            );

            if (!response.ok) throw new Error("Failed to update store");

            navigate(`/store/${storeId}`);
        } catch (error) {
            console.error("Error updating store:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Store List", "Edit Store"]} />
                <Typography variant="h3" gutterBottom>
                    Edit Store
                </Typography>
                <TextField
                    label="Store Name"
                    fullWidth
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
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
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Image URL"
                    fullWidth
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    margin="normal"
                />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ my: 3, mb: 5 }}
                    gap={2}
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

export default StoreEditPage;
