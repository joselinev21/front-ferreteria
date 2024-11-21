import z from "zod";

export const SchemaReportDamage = z.object({
  urlImage: z.string().url("La url de la imagen no es válida"),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre es muy largo"),
  descripcion: z
    .string()
    .min(1, "La descripcion es obligatoria")
    .max(200, "La descripcion no puede ser mayor a 200 caracteres"),
});
