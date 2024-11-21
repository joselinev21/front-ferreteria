import { z } from "zod";

export const schemaObra = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre es muy largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.#\s]+$/, "Solo . # letras, números y espacios"),
  telefono: z
    .string()
    .length(10, "El teléfono solo puede tener 10 digitos")
    .regex(/^\d+$/, "El teléfono solo admite números"),
  correo: z
    .string()
    .email("El correo es requerido")
    .max(30, "El correo es muy largo"),
  rfc: z
    .string()
    .length(13, "El RFC debe tener 13 caracteres")
    .regex(/^[A-Z0-9]+$/, { message: "El RFC solo debe contener letras mayúsculas y números" })
    .refine((value) => {
      const lettersCount = (value.match(/[A-Z]/g) || []).length;
      const numbersCount = (value.match(/[0-9]/g) || []).length;
      return lettersCount >= 3 && numbersCount >= 6;
    }, {
      message: "El RFC debe contener al menos 3 letras y 6 números",
    }),
  descripcion: z
    .string()
    .min(1, "La descripcion es requerida")
    .max(500, "Limite de 500 caracteres alcanzado"),
  calle: z
    .string()
    .min(1, "La calle es requerida")
    .max(50, "La calle es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números, espacios y puntos" }),  
  numero: z
    .string()
    .min(1, "El número es requerido")
    .max(6, "El número es muy largo")
    .regex(/^[a-zA-Z0-9-/]+$/, { message: "Solo se admiten / - letras y números" }),  
  colonia: z
    .string()
    .min(1, "La colonia es requerida")
    .max(50, "La colonia es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números y espacios" }),
  ciudad: z
    .string()
    .min(1, "La ciudad es requerido")
    .max(20, "La ciudad es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números y espacios" }),
  calleP: z
    .string()
    .min(1, "La calle es requerida")
    .max(50, "La calle es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números y espacios" }),
  numeroP: z
    .string()
    .min(1, "El número es requerido")
    .max(7, "El número es muy largo")
    .regex(/^[a-zA-Z0-9-/]+$/, { message: "Solo se admiten / - letras y números" }),  
  coloniaP: z
    .string()
    .min(1, "La colonia es requerida")
    .max(50, "La colonia es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números y espacios" }),
  ciudadP: z
    .string()
    .min(1, "La ciudad es requerido")
    .max(20, "La ciudad es muy larga")
    .regex(/^[a-zA-Z0-9\s.]+$/, { message: "Solo se admiten letras, números y espacios" }),
});
