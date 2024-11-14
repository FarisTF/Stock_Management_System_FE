import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BreadcrumbNav = ({ paths }) => {
    const navigate = useNavigate();
    console.log(paths);

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 1 }}>
            {paths.map((path, index) =>
                index === paths.length - 1 ? (
                    <Typography key={path.label} color="text.primary">
                        {path.label}
                    </Typography>
                ) : (
                    <Link
                        key={path.label}
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate(path.url)}
                        sx={{ cursor: "pointer" }}
                    >
                        {path.label}
                    </Link>
                )
            )}
        </Breadcrumbs>
    );
};

export default BreadcrumbNav;
