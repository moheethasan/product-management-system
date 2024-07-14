import { z } from "zod";

const variantValidationSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
