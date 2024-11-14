import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "../components/Header";
import BreadcrumbNav from "../components/BreadcrumbNav";
import StockActionsMenu from "../components/StockActionsMenu";
import { useParams } from "react-router-dom";
import BulkUpdateDialog from "../components/BulkUpdateDialog";
import DeleteStockConfirmationDialog from "../components/DeleteStockConfirmationDialog";
import AddStockEntryDialog from "../components/AddStockEntryDialog";

import { API_BASE_URL } from "../config";

const StockOperationalPage = () => {
    const [rows, setRows] = useState([]);
    const [productsNotInStock, setProductsNotInStock] = useState([]);
    const { storeId } = useParams();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addStockEntryDialogOpen, setAddStockEntryDialogOpen] =
        useState(false);

    // Fetch stocks for the store
    const fetchData = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks`
            );
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setRows(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch products not currently in stock for the store
    const fetchProductsNotInStock = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/notInStocks`
            );
            if (!response.ok)
                throw new Error("Failed to fetch products not in stock");
            const data = await response.json();
            setProductsNotInStock(data);
        } catch (error) {
            console.error("Error fetching products not in stock:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchProductsNotInStock();
        console.log("FETCH ULANG COOOOYYYYYYYYYY");
    }, [storeId]);

    const handleBulkUpdateClick = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${selectedProduct.id}/delete`,
                { method: "DELETE" }
            );
            if (!response.ok) throw new Error("Failed to delete stock");

            console.log(
                `Stock for ${selectedProduct.product_name} deleted successfully`
            );

            fetchData();
            fetchProductsNotInStock();
            setDeleteDialogOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error("Error deleting stock:", error);
        }
    };

    const handleIncrementQuantity = async (stockId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${stockId}/addQuantity`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok) throw new Error("Failed to increase quantity");

            const updatedStock = await response.json();
            console.log(updatedStock);
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === updatedStock.id
                        ? { ...row, quantity: updatedStock.quantity }
                        : row
                )
            );
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecrementQuantity = async (stockId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/stores/${storeId}/stocks/${stockId}/substractQuantity`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok) throw new Error("Failed to decrease quantity");

            const updatedStock = await response.json();
            console.log(updatedStock);
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === updatedStock.id
                        ? { ...row, quantity: updatedStock.quantity }
                        : row
                )
            );
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const handleOpenAddStockEntryDialog = () => {
        setAddStockEntryDialogOpen(true);
    };

    const handleCloseAddStockEntryDialog = () => {
        setAddStockEntryDialogOpen(false);
    };

    const handleApplyStockEntry = () => {
        fetchData();
        fetchProductsNotInStock();
    };

    const columns = [
        {
            field: "product_name",
            headerName: "Product Name",
            width: 275,
            headerAlign: "center",
        },
        {
            field: "category_name",
            headerName: "Category",
            width: 225,
            headerAlign: "center",
        },
        {
            field: "product_price",
            headerName: "Price",
            width: 200,
            headerAlign: "center",
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 150,
            headerAlign: "center",
            renderCell: (params) => (
                <Box display="flex" alignItems="center">
                    {params.value}
                </Box>
            ),
        },
        {
            field: "actions",
            headerName: "",
            width: 250,
            headerAlign: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box display="flex" alignItems="center">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleIncrementQuantity(params.row.id)}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleDecrementQuantity(params.row.id)}
                        sx={{ ml: 0.3, mr: 1 }}
                    >
                        <RemoveIcon sx={{ color: "red" }} />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBulkUpdateClick(params.row)}
                    >
                        Bulk Update
                    </Button>
                    <StockActionsMenu
                        onDelete={() => handleDeleteClick(params.row)}
                        productId={params.row.product_id}
                    />
                </Box>
            ),
        },
    ];

    return (
        <>
            <Header />
            <Container>
                <BreadcrumbNav
                    paths={[
                        { label: "Store List", url: "/" },
                        {
                            label: `Stock Operational Store ${storeId}`,
                            url: "",
                        },
                    ]}
                />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
                        Stock Operational Store {storeId}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: -2 }}
                        onClick={handleOpenAddStockEntryDialog}
                    >
                        <AddIcon sx={{ mr: 0.5, ml: -1 }} />
                        Add New Stock
                    </Button>
                </Box>
                <div style={{ height: 510, width: "100%" }}>
                    <DataGrid
                        disableRowSelectionOnClick
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        sx={{
                            "& .MuiDataGrid-row.Mui-hovered": {
                                backgroundColor: "transparent",
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "transparent",
                            },
                            "& .MuiDataGrid-cell:focus": { outline: "none" },
                            "& .MuiDataGrid-cell:focus-within": {
                                outline: "none",
                            },
                            border: 1,
                            borderColor: "grey.100",
                            p: 2,
                        }}
                    />
                </div>

                <BulkUpdateDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    onApply={(updatedStock) => {
                        setRows((prevRows) =>
                            prevRows.map((row) =>
                                row.id === updatedStock.id
                                    ? {
                                          ...row,
                                          quantity: updatedStock.quantity,
                                      }
                                    : row
                            )
                        );
                    }}
                    productName={selectedProduct?.product_name || ""}
                    storeId={storeId}
                    stockId={selectedProduct?.id}
                />

                <DeleteStockConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    onConfirm={handleConfirmDelete}
                    productName={selectedProduct?.product_name || ""}
                />

                <AddStockEntryDialog
                    open={addStockEntryDialogOpen}
                    onClose={handleCloseAddStockEntryDialog}
                    onApply={handleApplyStockEntry}
                    productsNotInStock={productsNotInStock}
                    refetchNotInStocks={fetchProductsNotInStock}
                />
            </Container>
        </>
    );
};

export default StockOperationalPage;
