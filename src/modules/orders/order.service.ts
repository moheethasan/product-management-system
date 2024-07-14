import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await OrderModel.create(orderData);
  return result;
};

const getAllOrdersFromDB = async (email: string | null) => {
  let result;
  if (email) {
    result = await OrderModel.find({ email: email });
    return result;
  }
  result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
