"use client";

import { LoginFormData } from "@/schemas/auth/loginSchema";
import { useForm } from "react-hook-form";
import { loginAction } from "@/server/login";
import Swal from "sweetalert2";
import { Mail, Lock, AlertCircle, KeyRound } from "lucide-react";
import Button from "@/src/ui/Button";
import Logo from "@/src/ui/Logo";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "all",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginAction(data);

      if (response.success) {
        await Swal.fire({
          title: "¡Acceso concedido!",
          text: response.message,
          icon: "success",
          confirmButtonText: "Continuar",
          background: "#0f172a",
          color: "#e2e8f0",
          iconColor: "#22d3ee",
        });
      } else {
        await Swal.fire({
          title: "Error de autenticación",
          text: response.message,
          icon: "error",
          confirmButtonText: "Reintentar",
          background: "#0f172a",
          color: "#e2e8f0",
          iconColor: "#f87171",
        });
      }
    } catch {
      await Swal.fire({
        title: "Fallo en el sistema",
        text: "Ocurrió un error inesperado",
        icon: "error",
        confirmButtonText: "Entendido",
        background: "#0f172a",
        color: "#e2e8f0",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-evenly bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <div className="w-full max-w-sm space-y-8">
        {/* Encabezado con icono futurista */}
        <div className="text-center">
          <Logo />

          <div className="mx-auto mt-4 w-16 h-16 flex items-center justify-center bg-cyan-500/10 rounded-full mb-4 border border-cyan-400/30">
            <KeyRound className="h-8 w-8 text-cyan-400" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl font-light tracking-wide text-slate-100">
            Acceso{" "}
            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Seguro
            </span>
          </h2>
          <p className="mt-2  mb-6 text-sm text-slate-400">
            Ingresa tus credenciales registradas
          </p>
        </div>

        {/* Tarjeta del formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-slate-800/50 backdrop-blur-md p-8 rounded-xl border border-slate-700/50 shadow-lg"
        >
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className=" text-sm font-medium text-slate-300 mb-1 flex items-center"
            >
              <Mail className="w-4 h-4 mr-1 text-slate-400" />
              Correo electrónico
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full py-2.5 pl-10 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="ejemplo@dominio.com"
                {...register("email", {
                  required: "Correo electrónico requerido",
                })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label
              htmlFor="password"
              className=" text-sm font-medium text-slate-300 mb-1 flex items-center"
            >
              <Lock className="w-4 h-4 mr-1 text-slate-400" />
              Contraseña
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full py-2.5 pl-10 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="••••••••"
                {...register("password", {
                  required: "Contraseña requerida",
                })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <div>
            <Button isSubmitting={isSubmitting} />
          </div>

          {/* Enlaces adicionales */}
          <div className="flex items-center justify-between text-sm">
            <a
              href="#"
              className="font-medium text-slate-400 hover:text-cyan-400 flex items-center transition-colors"
            >
              <KeyRound className="w-4 h-4 mr-1" />
              Recuperar acceso
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
