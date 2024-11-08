import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch categories data on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/categories`);
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Menu state and handlers for actions
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleMenuOpen = (event, categoryId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategoryId(categoryId);
        console.log("masukkkkk");
        console.log(categoryId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // setSelectedCategoryId(null); RACING CONDITION
    };

    const handleEditCategory = () => {
        navigate(`/categories/${selectedCategoryId}/edit`);
        handleMenuClose();
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        console.log(selectedCategoryId);
        try {
            await fetch(
                `${API_BASE_URL}/categories/${selectedCategoryId}/delete`,
                {
                    method: "DELETE",
                }
            );
            setCategories(
                categories.filter(
                    (category) => category.id !== selectedCategoryId
                )
            );
        } catch (error) {
            console.error("Error deleting category:", error);
        }
        setDeleteDialogOpen(false);
    };

    // Define columns for DataGrid
    const columns = [
        { field: "id", headerName: "ID", width: 90, headerAlign: "center" },
        {
            field: "name",
            headerName: "Category Name",
            width: 300,
            headerAlign: "center",
        },
        {
            field: "description",
            headerName: "Description",
            width: 450,
            headerAlign: "center",
        },
        {
            field: "products_count",
            headerName: "Products Count",
            width: 150,
            headerAlign: "center",
        },
        {
            field: "actions",
            headerName: "",
            width: 50,
            headerAlign: "center",
            renderCell: (params) => (
                <IconButton
                    onClick={(event) => handleMenuOpen(event, params.row.id)}
                >
                    <MoreVertIcon />
                </IconButton>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav paths={["Category List"]} />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h3" gutterBottom>
                        Category List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/categories/new")}
                    >
                        Add New Category
                    </Button>
                </Box>
                <Box sx={{ height: 510, width: "100%" }}>
                    <DataGrid
                        rows={categories}
                        columns={columns}
                        pageSize={5}
                        sx={{
                            "& .MuiDataGrid-cell": { outline: "none" },
                            "& .MuiDataGrid-cell:focus-within": {
                                outline: "none",
                            },
                            border: 1,
                            borderColor: "grey.300",
                            p: 2,
                        }}
                    />
                </Box>

                {/* Menu for category actions */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleEditCategory}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick} sx={{ color: "red" }}>
                        Delete
                    </MenuItem>
                </Menu>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this category? This
                        action cannot be undone.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            color="error"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default CategoryListPage;
