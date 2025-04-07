import { Status } from "@prisma/client";
import { z } from "zod";



export const ProjectFormSchema = z.object({
    name: z.string().min(1, "Nombre es requerido").max(100, "El nombre no puede exceder los 100 caracteres"),
    description: z.string().min(1, "Descripción es requerida").max(500, "La descripción no puede exceder los 500 caracteres"),
    startDate: z.date().min(new Date(), "La fecha de inicio no puede ser anterior a la fecha actual"),
    endDate: z.date().min(new Date(), "La fecha de fin no puede ser anterior a la fecha de inicio"),
    status: z.nativeEnum(Status),
})

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;