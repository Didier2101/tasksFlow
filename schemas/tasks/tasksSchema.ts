import { StatusTasks } from "@prisma/client"
import { z } from "zod"


export const TaskFormSchema = z.object({
    title: z.string().min(1, 'Título es obligatorio'),
    description: z.string().min(10, 'Descripción es obligatoria y debe tener al menos 10 caracteres'),
    colaboratorId: z.number().int().positive('El ID del proyecto debe ser un número positivo'),
    projectId: z.number().int().positive('El ID del proyecto debe ser un número positivo'),
    status: z.nativeEnum(StatusTasks),
})

export type TaskFormData = z.infer<typeof TaskFormSchema>