import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const StockActionsMenu = ({ onDelete, productId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        onDelete();
        handleClose();
    };

    const handleProductDetail = () => {
        console.log("hehe");
        console.log(productId);
        navigate(`/products/${productId}`);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProductDetail} sx={{ py: 1 }}>
                    <InfoIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Entry Detail
                </MenuItem>
                <MenuItem
                    onClick={handleDeleteClick}
                    sx={{ color: "red", py: 1 }}
                >
                    <DeleteIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Delete Stock
                </MenuItem>
            </Menu>
        </>
    );
};

export default StockActionsMenu;
