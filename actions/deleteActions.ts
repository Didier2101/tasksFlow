// server/actions/deleteActions.ts
"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export interface DeleteResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Action para eliminar colaborador
export async function deleteColaborador(id: string | number): Promise<DeleteResponse> {
    try {
        // Validar el ID
        if (!id) {
            return {
                success: false,
                message: "ID de colaborador no proporcionado",
            };
        }

        // Convertir a número si es necesario
        const colaboradorId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(colaboradorId)) {
            return {
                success: false,
                message: "ID de colaborador inválido",
            };
        }

        // Verificar si el colaborador existe
        const colaborador = await prisma.colaborators.findUnique({
            where: { id: colaboradorId },
            include: {
                tasks: true,
                users: true
            }
        });

        if (!colaborador) {
            return {
                success: false,
                message: "Colaborador no encontrado",
            };
        }

        // Eliminar en cascada: primero los ingresos relacionados con los usuarios
        for (const user of colaborador.users) {
            await prisma.income.deleteMany({
                where: { usersId: user.id }
            });
        }

        // Luego eliminar los usuarios relacionados
        await prisma.users.deleteMany({
            where: { colaboratorId: colaboradorId }
        });

        // Eliminar las tareas relacionadas
        await prisma.tasks.deleteMany({
            where: { colaboratorId: colaboradorId }
        });

        // Finalmente eliminar el colaborador
        await prisma.colaborators.delete({
            where: { id: colaboradorId }
        });

        // Revalidar rutas
        revalidatePath('/admin/colaboradores');

        return {
            success: true,
            message: "Colaborador eliminado correctamente"
        };
    } catch (error) {
        console.error("Error al eliminar colaborador:", error);
        return {
            success: false,
            message: "No se pudo eliminar el colaborador",
            error: error instanceof Error ? error.message : "Error desconocido"
        };
    }
}

// Action para eliminar tarea
export async function deleteTask(id: string | number): Promise<DeleteResponse> {
    try {
        // Validar el ID
        if (!id) {
            return {
                success: false,
                message: "ID de tarea no proporcionado",
            };
        }

        // Convertir a número si es necesario
        const taskId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(taskId)) {
            return {
                success: false,
                message: "ID de tarea inválido",
            };
        }

        // Verificar si la tarea existe
        const task = await prisma.tasks.findUnique({
            where: { id: taskId }
        });

        if (!task) {
            return {
                success: false,
                message: "Tarea no encontrada",
            };
        }

        // Eliminar la tarea
        await prisma.tasks.delete({
            where: { id: taskId }
        });

        // Revalidar rutas
        revalidatePath('/admin/proyectos');

        return {
            success: true,
            message: "Tarea eliminada correctamente"
        };
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return {
            success: false,
            message: "No se pudo eliminar la tarea",
            error: error instanceof Error ? error.message : "Error desconocido"
        };
    }
}

// Action para eliminar proyecto
export async function deleteProject(id: string | number): Promise<DeleteResponse> {
    try {
        // Validar el ID
        if (!id) {
            return {
                success: false,
                message: "ID de proyecto no proporcionado",
            };
        }

        // Convertir a número si es necesario
        const projectId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(projectId)) {
            return {
                success: false,
                message: "ID de proyecto inválido",
            };
        }

        // Verificar si el proyecto existe
        const project = await prisma.projects.findUnique({
            where: { id: projectId },
            include: {
                tasks: true
            }
        });

        if (!project) {
            return {
                success: false,
                message: "Proyecto no encontrado",
            };
        }

        // Primero eliminar todas las tareas asociadas al proyecto
        await prisma.tasks.deleteMany({
            where: { projectId: projectId }
        });

        // Luego eliminar el proyecto
        await prisma.projects.delete({
            where: { id: projectId }
        });

        // Revalidar rutas
        revalidatePath('/admin/proyectos');

        return {
            success: true,
            message: "Proyecto eliminado correctamente"
        };
    } catch (error) {
        console.error("Error al eliminar proyecto:", error);
        return {
            success: false,
            message: "No se pudo eliminar el proyecto",
            error: error instanceof Error ? error.message : "Error desconocido"
        };
    }
}

// Función genérica para manejar eliminaciones
export async function handleDelete(id: string | number, type: string): Promise<DeleteResponse> {
    // Validar los parámetros
    if (!id) {
        return {
            success: false,
            message: "ID no proporcionado",
        };
    }

    if (!type) {
        return {
            success: false,
            message: "Tipo de entidad no proporcionado",
        };
    }

    switch (type) {
        case "colaborador":
            return await deleteColaborador(id);
        case "tarea":
            return await deleteTask(id);
        case "proyecto":
            return await deleteProject(id);
        default:
            return {
                success: false,
                message: `Tipo de entidad no válido: ${type}`,
            };
    }
}