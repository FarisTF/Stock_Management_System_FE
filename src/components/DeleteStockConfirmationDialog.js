// DeleteStockConfirmationDialog.js
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const DeleteStockConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    productName,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Stock for {productName}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete the stock for this product?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteStockConfirmationDialog;
