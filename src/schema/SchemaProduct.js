import z from "zod";

export const SchemaProduct = z.object({
  urlImage: z
    .string()
    .min(1, { message: "La imagen del producto es requerida" }),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre es muy largo")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.#\s]+$/,
      "Solo . # letras, números y espacios"
    ),
  cantidad: z
    .string()
    .min(1, { message: "La cantidad del producto es requerida" })
    .max(4, { message: "Límite de productos alcanzado" })
    .regex(/^\d+$/, { message: "Solo se admiten números enteros" }),
  stockMinimo: z
    .string()
    .min(1, { message: "El stock mínimo es requerido" })
    .max(4, { message: "Límite alcanzado" })
    .regex(/^\d+$/, { message: "Solo se admiten números enteros" }),
  costo: z
    .string()
    .min(1, { message: "El costo del producto es requerido" })
    .max(9, { message: "Límite alcanzado" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Solo se admiten numeros y decimales",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El precio debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 99999.99, {
      message: "El precio no puede ser mayor a 99999.99",
    }),
  precioMenudeo: z
    .string()
    .min(1, { message: "El precio a menudeo es requerido" })
    .max(9, { message: "Límite alcanzado" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Solo se admiten numeros y decimales",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El precio debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 99999.99, {
      message: "El precio no puede ser mayor a 99999.99",
    }),
  precioMayoreo: z
    .string()
    .min(1, { message: "El costo del producto es requerido" })
    .max(9, { message: "Límite alcanzado" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Solo se admiten numeros y decimales",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El precio debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 99999.99, {
      message: "El precio no puede ser mayor a 99999.99",
    }),
  descripcion: z
    .string()
    .min(1, { message: "La descripción es requerida" })
    .max(200, { message: "La descripción es muy larga" }),
});
