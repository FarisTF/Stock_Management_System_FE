import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";

const BreadcrumbNav = ({ paths }) => (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 1 }}>
        {paths.map((path, index) =>
            index === paths.length - 1 ? (
                <Typography key={path} color="text.primary">
                    {path}
                </Typography>
            ) : (
                <Link key={path} underline="hover" color="inherit" href="#">
                    {path}
                </Link>
            )
        )}
    </Breadcrumbs>
);

export default BreadcrumbNav;
