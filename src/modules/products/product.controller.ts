import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Extract searchTerm query parameter if present
    const { searchTerm } = req.query;
    let result;

    if (searchTerm) {
      // if a searchTerm is provided, search the products
      result = await ProductServices.searchProductsInDB(searchTerm as string);

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
    } else {
      // if there's no searchTerm
      result = await ProductServices.getAllProductsFromDB();

      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;
    const zodParsedUpdatedData =
      productValidationSchema.parse(updatedProductData);

    const result = await ProductServices.updateProductInDB(
      productId,
      zodParsedUpdatedData
    );
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
