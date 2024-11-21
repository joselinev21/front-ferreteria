import z from "zod";

export const SchemeSuplier = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre es muy largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.#\s]+$/, "Solo . # letras, números y espacios"),
  telefono: z
    .string()
    .min(1, "Debes ingresar el teléfono de contacto")
    .length(10, "El teléfono solo puede tener 10 caracteres")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  correo: z
    .string()
    .min(1, "Debes de ingresar un correo")
    .max(30, "El correo es muy largo")
    .email("El correo no es válido"),
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
  calle: z
    .string()
    .min(1, "La calle es requerida")
    .max(50, "La calle es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Solo se admiten letras, números y espacios" }), 
  colonia: z
    .string()
    .min(1, "La colonia es requerida")
    .max(50, "La colonia es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Solo se admiten letras, números y espacios" }),  
  numero: z
    .string()
    .min(1, "El número es requerido")
    .max(7, "El número es muy largo")
    .regex(/^[a-zA-Z0-9-/]+$/, { message: "Solo se admiten / - letras y números" }),  
  ciudad: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(20, "La ciudad es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Solo se admiten letras, números y espacios" }),
});
