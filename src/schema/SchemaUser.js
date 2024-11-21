import { z } from "zod";

export const Passwords = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La confirmación debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const UserLogin = z.object({
  usuario: z.string().min(1, "El usuario es requerido"),
  contrasena: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const User = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre es muy largo")
    .regex(
      /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/,
      "El nombre solo debe contener letras y espacios"
    ),
  telefono: z
    .string()
    .min(1, "Debes ingresar el teléfono de contacto")
    .length(10, "El teléfono solo admite 10 digitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  correo: z
    .string()
    .min(1, "Debes de ingresar un correo")
    .max(30, "El correo es muy largo")
    .email("El correo no es válido"),
  rfc: z
    .string()
    .length(13, "El RFC debe tener 13 caracteres")
    .regex(/^[A-Z0-9]+$/, {
      message: "El RFC solo debe contener letras mayúsculas y números",
    })
    .refine(
      (value) => {
        const lettersCount = (value.match(/[A-Z]/g) || []).length;
        const numbersCount = (value.match(/[0-9]/g) || []).length;
        return lettersCount >= 3 && numbersCount >= 6;
      },
      {
        message: "El RFC debe contener al menos 3 letras y 6 números",
      }
    ),
  calle: z
    .string()
    .min(1, "La calle es requerida")
    .max(50, "La calle es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Solo se admiten letras, números y espacios",
    }),
  numero: z
    .string()
    .min(1, "El número es requerido")
    .max(7, "El número es muy largo")
    .regex(/^[a-zA-Z0-9-/]+$/, { message: "Solo se admiten / - letras y números" }),  
  colonia: z
    .string()
    .min(1, "La colonia es requerida")
    .max(50, "La colonia es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Solo se admiten letras, números y espacios",
    }),
  ciudad: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(20, "La ciudad es muy larga")
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Solo se admiten letras, números y espacios",
    }),
  sueldo: z
    .string()
    .max(8, "Limite de digitos alcanzado")
    .regex(/^\d+(\.\d{1,2})?$/, { message: "El sueldo solo admite números y un punto decimal" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "El sueldo debe ser un número válido",
    })
    .refine((value) => parseFloat(value) >= 1, {
      message: "El sueldo debe ser mayor o igual a 1",
    })
    .refine((value) => parseFloat(value) <= 99999.99, {
      message: "El sueldo no puede ser mayor a 99999.99",
    }),
  usuario: z
    .string()
    .min(1, "El usuario es requerido")
    .max(15, "El usuario no puede superar 15 digitos"),
  contrasena: z
    .string()
    .min(8, "La contraseña es requerida")
    .max(10, "La contraseña no puede superar 10 caracteres")
    .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, "La contraseña solo admite @ # $ % ^ & * letras, números"),

});
