import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().min(1),
  productId: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
});

export default orderValidationSchema;
