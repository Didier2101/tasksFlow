"use server"

import { ProjectFormData } from "@/schemas/projects/projectSchema";
import { prisma } from "@/src/lib/prisma";
import { ProyectsType } from "@/src/types/projectsType";
import { revalidatePath } from "next/cache";

export const createProject = async (data: ProjectFormData) => {
    if (!data) {
        return {
            success: false,
            message: 'No se pudo crear el proyecto, por favor intente nuevamente.'
        }
    }
    try {


        const newProject = await prisma.projects.create({
            data: {
                name: data.name,
                description: data.description,
                status: data.status,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
            },
        })

        revalidatePath('/admin/proyectos');
        return {
            success: true,
            message: "El proyecto fue creado exitosamente",
            project: newProject
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error al crear el proyecto",
            error: error instanceof Error ? error.message : "Error desconocido"
        }
    }
}


export const getProjects = async (): Promise<ProyectsType[]> => {
    const projects = await prisma.projects.findMany({
        include: {
            tasks: {
                include: {
                    colaborators: true, // Incluir el colaborador asignado a la tarea
                }
            },
        },
    });
    return projects as ProyectsType[];
}