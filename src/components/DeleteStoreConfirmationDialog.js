import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const DeleteStoreConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    storeName,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Store: {storeName}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete this store? Deleting the
                    store will remove all associated information and cannot be
                    undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Yes, Delete Store
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteStoreConfirmationDialog;
