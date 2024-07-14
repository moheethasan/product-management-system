import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";
import { ProductModel } from "../products/product.model";

export const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

orderSchema.pre("save", async function (next) {
  try {
    const orderedProduct = await ProductModel.findOne({ _id: this.productId });

    if (!orderedProduct) {
      return next(new Error("Invalid productId!"));
    }

    if (orderedProduct?.inventory.quantity < this.quantity) {
      return next(new Error("Insufficient quantity available in inventory"));
    }
    orderedProduct.inventory.quantity -= this.quantity;
    await ProductModel.findByIdAndUpdate(this.productId, {
      inventory: orderedProduct.inventory,
    });
    next();
  } catch (error) {
    next(new Error("Something went wrong!"));
  }
});

orderSchema.post("save", async function () {
  try {
    const orderedProduct = await ProductModel.findOne({ _id: this.productId });

    if (!orderedProduct) {
      return new Error("Invalid productId!");
    } else if (orderedProduct.inventory.quantity === 0) {
      orderedProduct.inventory.inStock = false;
      await ProductModel.findByIdAndUpdate(this.productId, {
        inventory: orderedProduct.inventory,
      });
    }
  } catch (error) {
    new Error("Something went wrong!");
  }
});

export const OrderModel = model<TOrder>("Order", orderSchema);
