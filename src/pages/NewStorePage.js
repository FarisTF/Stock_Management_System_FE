import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const NewStorePage = () => {
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imageLink, setImageLink] = useState("");

    const handleSave = async () => {
        // Prepare the store data as JSON
        const storeData = {
            name: storeName,
            description,
            address,
            phone_number: phoneNumber,
            img_url: imageLink,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/stores/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(storeData),
            });

            if (!response.ok) {
                throw new Error("Failed to save the store");
            }

            // Redirect back to the store list page
            navigate("/");
        } catch (error) {
            console.error("Error saving store:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Store List", "Add New Store"]} />
                <Typography variant="h3" gutterBottom>
                    New Store Entry
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
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Add New Store
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default NewStorePage;
