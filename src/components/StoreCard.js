import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const StoreCard = ({ storeName, storeDescription, storeImage, storeId }) => {
    const navigate = useNavigate();

    const handleDetailsClick = (e) => {
        e.preventDefault();
        navigate(`/storedetail/${storeId}`);
    };

    return (
        <Link to={`/store/${storeId}`} style={{ textDecoration: "none" }}>
            <Card
                sx={{
                    maxWidth: 345,
                    height: 415, // Increased height to accommodate the button
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                }}
            >
                <CardMedia
                    component="img"
                    height="250" // Fixed height for image
                    image={storeImage}
                    alt={`${storeName} image`}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {storeName}
                    </Typography>
                    <Box
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, // Limits to 3 lines before truncating
                        }}
                    >
                        <Typography variant="body1" component="div">
                            {storeDescription}
                        </Typography>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="left">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleDetailsClick}
                        >
                            Store Details
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};

export default StoreCard;
