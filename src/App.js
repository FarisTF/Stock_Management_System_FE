import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreListPage from "./pages/StoreListPage";
import StockOperationalPage from "./pages/StockOperationalPage";
import ProductEntryPage from "./pages/ProductEntryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EditProductEntryPage from "./pages/EditProductEntryPage";
import NewStorePage from "./pages/NewStorePage"; // Import the NewStorePage
import StoreDetailPage from "./pages/StoreDetailPage";
import StoreEditPage from "./pages/StoreEditPage";
import CategoryListPage from "./pages/CategoryListPage";
import NewCategoryPage from "./pages/NewCategoryPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import ProductListPage from "./pages/ProductListPage";

import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import {
    getDesignTokens,
    getThemedComponents,
} from "./themes/muiBrandingTheme";

const designTokens = getDesignTokens("light");
let newTheme = createTheme(designTokens);
newTheme = deepmerge(newTheme, getThemedComponents(newTheme));

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={newTheme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<StoreListPage />} />
                        <Route
                            path="/store/:storeId"
                            element={<StockOperationalPage />}
                        />
                        <Route
                            path="/products/:productId"
                            element={<ProductDetailPage />}
                        />{" "}
                        {/* Product Detail */}
                        <Route
                            path="/products/new"
                            element={<ProductEntryPage />}
                        />{" "}
                        {/* New Product Entry */}
                        <Route
                            path="/products/:productId/edit"
                            element={<EditProductEntryPage />}
                        />{" "}
                        {/* Edit Product Entry */}
                        <Route
                            path="/newstore"
                            element={<NewStorePage />}
                        />{" "}
                        {/* Add Route for NewStorePage */}
                        <Route
                            path="/storedetail/:storeId"
                            element={<StoreDetailPage />}
                        />
                        <Route
                            path="/store/:storeId/edit"
                            element={<StoreEditPage />}
                        />
                        <Route
                            path="/categories"
                            element={<CategoryListPage />}
                        />
                        <Route
                            path="/categories/new"
                            element={<NewCategoryPage />}
                        />
                        <Route
                            path="/categories/:categoryId/edit"
                            element={<CategoryEditPage />}
                        />
                        <Route path="/products" element={<ProductListPage />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
