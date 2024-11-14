import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    InputAdornment,
} from "@mui/material";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const NewStorePage = () => {
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("62"); // Start with default country code
    const [imageLink, setImageLink] = useState("");

    const [storeNameError, setStoreNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(false);

    const handlePhoneNumberChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, ""); // Only allow digits

        // Format the phone number with hyphens
        if (value.length > 2 && value.length <= 6) {
            value = `${value.slice(0, 2)}-${value.slice(2)}`;
        } else if (value.length > 6 && value.length <= 10) {
            value = `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(
                6
            )}`;
        } else if (value.length > 10) {
            value = `${value.slice(0, 2)}-${value.slice(2, 6)}-${value.slice(
                6,
                10
            )}-${value.slice(10)}`;
        }

        setPhoneNumber(value);
    };

    const handleSave = async () => {
        // Validate fields
        setStoreNameError(!storeName);
        setDescriptionError(!description);
        setAddressError(!address);
        setPhoneNumberError(phoneNumber.length < 10 || phoneNumber.length > 16);
        setImageLinkError(!imageLink);

        if (
            !storeName ||
            !description ||
            !address ||
            !imageLink ||
            phoneNumber.length < 10 ||
            phoneNumber.length > 16
        ) {
            return; // Stop if any required field is empty or invalid
        }

        // Prepare the store data as JSON
        const storeData = {
            name: storeName,
            description,
            address,
            phone_number: phoneNumber.replace(/-/g, ""), // Remove hyphens
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

            navigate("/");
        } catch (error) {
            console.error("Error saving store:", error);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={[
                        { label: "Store List", url: "/" },
                        { label: "Add New Store", url: "" },
                    ]}
                />
                <Typography variant="h3" gutterBottom>
                    New Store Entry
                </Typography>
                <TextField
                    label="Store Name"
                    fullWidth
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    margin="normal"
                    error={storeNameError}
                    helperText={storeNameError ? "Store Name is required." : ""}
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    error={descriptionError}
                    helperText={
                        descriptionError ? "Description is required." : ""
                    }
                />
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                    error={addressError}
                    helperText={addressError ? "Address is required." : ""}
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    margin="normal"
                    error={phoneNumberError}
                    helperText={
                        phoneNumberError
                            ? "Please enter a valid phone number (6-14 digits)."
                            : ""
                    }
                    placeholder="62-812-3456-7890"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">+</InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Image URL"
                    fullWidth
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    margin="normal"
                    error={imageLinkError}
                    helperText={imageLinkError ? "Image URL is required." : ""}
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
