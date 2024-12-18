import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Box,
    Autocomplete,
    TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const AddStockEntryDialog = ({
    open,
    onClose,
    onApply,
    productsNotInStock,
    refetchNotInStocks,
}) => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const { storeId } = useParams();
    const navigate = useNavigate();

    // Refetch products not in stock each time the dialog opens
    useEffect(() => {
        if (open) {
            refetchNotInStocks();
        }
    }, [open]);

    const handleProductChange = (productId) => {
        setSelectedProduct(productId);
    };

    const handleApply = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${selectedProduct}/store`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add stock entry");
            }

            console.log("Stock entry added successfully");

            if (onApply) onApply(); // Trigger any additional actions onApply
            onClose(); // Close the dialog after applying
        } catch (error) {
            console.error("Error adding stock entry:", error);
        }
    };

    const handleNewProductEntry = () => {
        onClose(); // Close the dialog
        navigate(`/products/new`); // Navigate to the New Product Entry page
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Stock Entry</DialogTitle>
            <DialogContent sx={{ pr: 25 }}>
                <Typography variant="body1" gutterBottom>
                    Select from Existing Product Entry
                </Typography>
                <FormControl fullWidth margin="dense">
                    {/* <InputLabel>Product</InputLabel> */}
                    <Autocomplete
                        options={productsNotInStock
                            .slice()
                            .sort((a, b) => a.name.localeCompare(b.name))} // Sort alphabetically by name
                        getOptionLabel={(option) => option.name || ""} // Display product name
                        value={
                            productsNotInStock.find(
                                (product) => product.id === selectedProduct
                            ) || null
                        } // Match selected product or null if none
                        onChange={(event, newValue) => {
                            handleProductChange(newValue ? newValue.id : null); // Pass product ID or null if cleared
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Product"
                                variant="outlined"
                            />
                        )}
                    />
                </FormControl>
                <Box my={2}>
                    <Typography variant="body2" align="center">
                        Or
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleNewProductEntry}
                >
                    Add New Product Entry
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleApply}
                    color="primary"
                    variant="contained"
                    disabled={!selectedProduct} // Disable if no product is selected
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStockEntryDialog;
