"use server"

import { TaskFormData } from "@/schemas/tasks/tasksSchema";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";




export const createTask = async (data: TaskFormData) => {
    if (!data) {
        return {
            success: false,
            message: 'No se pudo crear la tarea, por favor intente nuevamente.'
        }
    }
    try {
        const newTask = await prisma.tasks.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                projectId: parseInt(data.projectId.toString()), // Asegurarse de que el ID del proyecto sea un número
                colaboratorId: parseInt(data.colaboratorId.toString()), // Asegurarse de que el ID del colaborador sea un número
            }
        })

        // Revalidar la ruta para obtener los datos actualizados
        revalidatePath('/admin/proyectos');

        return {
            success: true,
            message: "La tarea fue creada exitosamente",
            task: newTask
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error al crear la tarea",
            error: error instanceof Error ? error.message : "Error desconocido"
        }
    }
}