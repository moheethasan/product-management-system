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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../products/product.model");
exports.orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
exports.orderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderedProduct = yield product_model_1.ProductModel.findOne({ _id: this.productId });
            if (!orderedProduct) {
                return next(new Error("Invalid productId!"));
            }
            if ((orderedProduct === null || orderedProduct === void 0 ? void 0 : orderedProduct.inventory.quantity) < this.quantity) {
                return next(new Error("Insufficient quantity available in inventory"));
            }
            orderedProduct.inventory.quantity -= this.quantity;
            yield product_model_1.ProductModel.findByIdAndUpdate(this.productId, {
                inventory: orderedProduct.inventory,
            });
            next();
        }
        catch (error) {
            next(new Error("Something went wrong!"));
        }
    });
});
exports.orderSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderedProduct = yield product_model_1.ProductModel.findOne({ _id: this.productId });
            if (!orderedProduct) {
                return new Error("Invalid productId!");
            }
            else if (orderedProduct.inventory.quantity === 0) {
                orderedProduct.inventory.inStock = false;
                yield product_model_1.ProductModel.findByIdAndUpdate(this.productId, {
                    inventory: orderedProduct.inventory,
                });
            }
        }
        catch (error) {
            new Error("Something went wrong!");
        }
    });
});
exports.OrderModel = (0, mongoose_1.model)("Order", exports.orderSchema);
