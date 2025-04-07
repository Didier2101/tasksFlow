"use server";

import { prisma } from "@/src/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";
import { LoginFormData } from "@/schemas/auth/loginSchema";

/**
 * Función principal para manejar el proceso de autenticación
 * @param {LoginFormData} data - Objeto con email y password del formulario de login
 * @returns {Promise<Object>} - Objeto con resultado de la operación (success, message, user, redirectTo)
 */
export const loginAction = async (data: LoginFormData) => {
    // ==============================================
    // 1. VERIFICACIÓN DE CONEXIÓN A LA BASE DE DATOS
    // ==============================================
    try {
        await prisma.$connect(); // Intenta establecer conexión con la DB
    } catch (dbError) {
        console.error("Error de conexión a la base de datos:", dbError);
        return {
            success: false,
            message: "Error de conexión con el servidor"
        };
    }

    // =============================
    // 2. VALIDACIÓN DE DATOS DE ENTRADA
    // =============================
    if (!data) {
        return {
            success: false,
            message: "No se recibieron datos del usuario"
        };
    }

    try {
        // =====================================
        // 3. BUSQUEDA DEL USUARIO EN LA BASE DE DATOS
        // =====================================
        const colaborador = await prisma.colaborators.findUnique({
            where: { email: data.email },  // Busca por email
            include: {
                users: true  // Incluye relación con la tabla users
            }
        });

        // =============================
        // 4. VALIDACIONES DEL USUARIO
        // =============================
        if (!colaborador) {
            return {
                success: false,
                message: `El correo ${data.email} no está registrado`
            };
        }

        // Verifica si el usuario está activo
        if (colaborador.status !== "ACTIVE") {
            return {
                success: false,
                message: "El usuario se encuentra inactivo"
            };
        }

        // Verifica si tiene usuario asociado
        if (colaborador.users.length === 0) {
            return {
                success: false,
                message: "No existe un usuario asociado a este correo"
            };
        }

        const usuario = colaborador.users[0]; // Obtiene el primer usuario asociado

        // =================================
        // 5. VALIDACIÓN DE CREDENCIALES
        // =================================
        // Compara la contraseña proporcionada con el hash almacenado
        const contrasenaValida = await bcrypt.compare(data.password, usuario.password);

        if (!contrasenaValida) {
            return {
                success: false,
                message: "La contraseña es incorrecta"
            };
        }

        // ====================================
        // 6. REGISTRO DE INGRESO (AUDITORÍA)
        // ====================================
        const nuevoIngreso = await prisma.income.create({
            data: {
                usersId: usuario.id,  // ID del usuario que ingresa
                entryDate: new Date(),  // Fecha y hora del login
            },
        });

        // ====================================
        // 7. GENERACIÓN DEL TOKEN JWT
        // ====================================
        const token = jwt.sign(
            {
                // Payload del token:
                id: usuario.id,
                name: colaborador.name,
                email: colaborador.email,
                jobRole: colaborador.jobRole,
                role: usuario.role,
                ingresoId: nuevoIngreso.id,  // ID del registro de ingreso
            },
            process.env.JWT_SECRET || 'your-secret-key',  // Clave secreta
            { expiresIn: '8h' }  // Token expira en 8 horas
        );

        // ====================================
        // 8. CONFIGURACIÓN DE COOKIES
        // ====================================
        const cookieStore = await cookies(); // Obtiene el almacén de cookies
        const cookieOptions = {
            secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
            path: '/',  // Accesible en toda la app
            maxAge: 8 * 60 * 60  // Expira en 8 horas (en segundos)
        };

        // Cookie con el token JWT (httpOnly por seguridad)
        cookieStore.set('auth_token', token, {
            ...cookieOptions,
            httpOnly: true  // No accesible desde JavaScript
        });

        // Cookies con datos del usuario (no sensibles)
        cookieStore.set('userName', colaborador.name, {
            ...cookieOptions,
            httpOnly: false  // Accesible desde el frontend
        });



        cookieStore.set('userRole', usuario.role, {
            ...cookieOptions,
            httpOnly: false
        });

        // ====================================
        // 9. PREPARACIÓN DE RESPUESTA
        // ====================================
        // Determina la ruta de redirección según el rol
        const redirectPath = usuario.role === 'ADMIN' ? '/admin' : '/dashboard';

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {  // Datos del usuario para el frontend
                id: usuario.id,
                name: colaborador.name,
                email: colaborador.email,
                jobRole: colaborador.jobRole,
                role: usuario.role
            },
            redirectTo: redirectPath  // Ruta a redirigir
        };
    } catch (error) {
        // ====================================
        // 10. MANEJO DE ERRORES GENERALES
        // ====================================
        console.error("Error en login:", error);
        return {
            success: false,
            message: "Error al procesar la solicitud",
        };
    } finally {
        // ====================================
        // 11. LIMPIEZA (DESCONEXIÓN DE PRISMA)
        // ====================================
        await prisma.$disconnect(); // Cierra la conexión con la DB
    }
}