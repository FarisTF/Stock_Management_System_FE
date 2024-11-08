// DeleteProductConfirmationDialog.js
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const DeleteProductConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    productName,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Product {productName}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete the global entry for this
                    product?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Please ensure that all associated stock records are removed
                    from all stores before deletion.
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

export default DeleteProductConfirmationDialog;
