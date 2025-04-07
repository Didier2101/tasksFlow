"use server"

import { ColaboradorFormData } from "@/schemas/colaboradores/colaboradorSchema";
import { prisma } from "@/src/lib/prisma";
import { ColaboradoresType } from "@/src/types/colaboradorestype";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

export const crearColaborador = async (data: ColaboradorFormData) => {
    try {
        // Verificar si ya existe un colaborador con ese email
        const colaboradorExistente = await prisma.colaborators.findUnique({
            where: { email: data.email },
        });

        if (colaboradorExistente) {
            return {
                success: false,
                message: "Ya existe un colaborador con este correo electrónico",
            };
        }
        // Encriptar la contraseña
        const hashedPassword = await hash(data.password, 10);

        // Crear el colaborador y usuario en una transacción
        const resultado = await prisma.$transaction(async (tx) => {
            // Primero crear el colaborador
            const colaborador = await tx.colaborators.create({
                data: {
                    name: data.name,
                    email: data.email,
                    jobRole: data.jobRole,
                    status: data.status,
                },
            });

            // Luego crear el usuario vinculado al colaborador
            const usuario = await tx.users.create({
                data: {
                    password: hashedPassword,
                    colaboratorId: colaborador.id,
                    role: data.role,
                },
            });

            return { colaborador, usuario };
        });

        revalidatePath('/admin/colaboradores')
        return {
            success: true,
            message: "Colaborador y usuario creados exitosamente",
            data: {
                id: resultado.colaborador.id,
                name: resultado.colaborador.name,
                email: resultado.colaborador.email,
                jobRole: resultado.colaborador.jobRole,
                status: resultado.colaborador.status,
                role: resultado.usuario.role,
            },
        };

    } catch (error) {
        console.error("Error en crearColaborador:", error);
        return {
            success: false,
            message: "Error al crear el colaborador y usuario",
            error: error instanceof Error ? error.message : "Error desconocido",
        };
    }
};

export const obtenerColaboradores = async (): Promise<ColaboradoresType[]> => {
    const colaboradores = await prisma.colaborators.findMany({
        include: {
            tasks: true,
            users: {
                include: {
                    income: true,
                }
            },
        },
    })
    return colaboradores as ColaboradoresType[];
}