import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "grey.300", py: 0.5 }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Product Management
                </Typography>
                <Button
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{ mr: 0.7 }}
                >
                    Store
                </Button>
                <Button
                    color="primary"
                    onClick={() => navigate("/categories")}
                    sx={{ mr: 0.7 }}
                >
                    Categories
                </Button>
                <Button color="primary" onClick={() => navigate("/products")}>
                    Products
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
