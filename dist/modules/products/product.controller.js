"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract searchTerm query parameter if present
        const { searchTerm } = req.query;
        let result;
        if (searchTerm) {
            // if a searchTerm is provided, search the products
            result = yield product_service_1.ProductServices.searchProductsInDB(searchTerm);
            // if no product matches the searchTerm
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `There is no product named '${searchTerm}'!`,
                    data: null,
                });
            }
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        else {
            // if there's no searchTerm
            result = yield product_service_1.ProductServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedProductData = req.body;
        const zodParsedUpdatedData = product_validation_1.default.parse(updatedProductData);
        const result = yield product_service_1.ProductServices.updateProductInDB(productId, zodParsedUpdatedData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: zodParsedUpdatedData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: error,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
