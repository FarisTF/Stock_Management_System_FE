import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { API_BASE_URL } from "../config";

const BulkUpdateDialog = ({
    open,
    onClose,
    onApply,
    productName,
    storeId,
    stockId,
}) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        const inputValue = event.target.value;
        // Ensure only positive integers are allowed
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${stockId}/bulkAddQuantity`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity: parseInt(value, 10) }), // Send positive quantity for addition
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add quantity");
            }

            const updatedStock = await response.json();
            onApply(updatedStock); // Update stock on success
            handleClose();
        } catch (error) {
            console.error("Error adding quantity:", error);
        }
    };

    const handleSubtract = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${stockId}/bulkSubstractQuantity`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity: -Math.abs(parseInt(value, 10)),
                    }), // Send negative quantity for subtraction
                }
            );

            if (!response.ok) {
                throw new Error("Failed to subtract quantity");
            }

            const updatedStock = await response.json();
            onApply(updatedStock); // Update stock on success
            handleClose();
        } catch (error) {
            console.error("Error subtracting quantity:", error);
        }
    };

    const handleClose = () => {
        setValue(""); // Reset the form value
        onClose(); // Call the provided onClose function
    };

    useEffect(() => {
        if (!open) {
            setValue(""); // Reset form when dialog closes
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Bulk Update Stock {productName}</DialogTitle>
            <DialogContent sx={{ pr: 20 }}>
                <Typography variant="body1" gutterBottom>
                    Enter Addition or Subtraction Value
                </Typography>
                <TextField
                    type="number"
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    inputProps={{ min: "1", step: "1" }} // Restrict to positive integers
                />
            </DialogContent>
            <DialogActions>
                <Box
                    display="flex"
                    justifyContent="center"
                    gap={2}
                    width="100%"
                    mb={2}
                >
                    <Button
                        onClick={handleSubtract}
                        variant="contained"
                        sx={{
                            backgroundColor: "#fce8e6", // Light red background
                            color: "#d32f2f", // Red text color
                            border: "1px solid #d32f2f", // Red outline
                            width: "125px",
                            "&:hover": { backgroundColor: "#f9d4d1" }, // Slightly darker red on hover
                        }}
                        startIcon={<RemoveIcon />}
                        disabled={!value || parseInt(value) <= 0} // Disable if no valid input
                    >
                        Subtract
                    </Button>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        sx={{
                            backgroundColor: "#e6f4ea", // Light green background
                            color: "#388e3c", // Green text color
                            border: "1px solid #388e3c", // Green outline
                            width: "125px",
                            "&:hover": { backgroundColor: "#d4ecd9" }, // Slightly darker green on hover
                        }}
                        startIcon={<AddIcon />}
                        disabled={!value || parseInt(value) <= 0} // Disable if no valid input
                    >
                        Add
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default BulkUpdateDialog;
