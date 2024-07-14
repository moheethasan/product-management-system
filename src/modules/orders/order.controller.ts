import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Insufficient quantity available in inventory") {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      }
    }

    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
