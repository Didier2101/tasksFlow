import { Role, Status } from "@prisma/client";
import { z } from "zod";

export const ColaboradorFormSchema = z.object({
    // Información básica del colaborador
    name: z.string()
        .min(1, "Nombre es requerido")
        .max(100, "El nombre no puede exceder los 100 caracteres"),

    email: z.string()
        .email("Dirección de correo inválida")
        .max(100, "El email no puede exceder los 100 caracteres"),

    jobRole: z.string()
        .min(1, "Cargo es requerido")
        .max(100, "El cargo no puede exceder los 100 caracteres"),

    status: z.nativeEnum(Status),

    // Información de usuario
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder los 50 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

    role: z.nativeEnum(Role),
}).refine(data => {
    // Validación adicional para contraseñas seguras
    if (data.role === Role.ADMIN) {
        return data.password.length >= 10;
    }
    return true;
}, {
    message: "Las contraseñas de administrador deben tener al menos 10 caracteres",
    path: ["password"]
});

// Tipo TypeScript derivado del esquema
export type ColaboradorFormData = z.infer<typeof ColaboradorFormSchema>;