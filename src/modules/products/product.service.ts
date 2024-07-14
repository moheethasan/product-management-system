import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
