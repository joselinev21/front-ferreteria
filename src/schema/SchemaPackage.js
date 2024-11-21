import z from "zod";

export const SchemaPackage = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre es muy largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.#\s]+$/, "Solo . # letras, números y espacios"),
  precio: z
    .string()
    .max(8, "Limite de caracteres excedido")
    .regex(/^\d+(\.\d{1,2})?$/, { message: "El precio solo admite números y un punto decimal" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "El precio debe ser un número válido",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El precio debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 9999.99, {
      message: "El precio no puede ser mayor a 9999.99",
    }),

  descripcion: z
    .string()
    .min(1, "La descripcion es obligatoria")
    .max(100, "La descripcion no puede ser mayor a 100 caracteres"),
});

export const SchemaOffer = z.object({
  precio: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "El precio debe ser un número válido",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El precio debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 9999, {
      message: "El precio no puede ser mayor a 9999",
    }),
  fechaFinal: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine(
      (value) => {
        const inputDate = new Date(value);
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        
        const currentYear = tomorrow.getFullYear();
        const inputYear = inputDate.getFullYear();

        return inputYear >= currentYear && inputDate >= tomorrow;
      },
      {
        message: "La fecha debe ser posterior a la fecha actual",
      }
    ),

});
