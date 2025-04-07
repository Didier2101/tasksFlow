"use client";

import {
  ColaboradorFormData,
  ColaboradorFormSchema,
} from "@/schemas/colaboradores/colaboradorSchema";
import { crearColaborador } from "@/server/colaboradores/colaboradores";
import { AlertCircle, Save, UserPlus, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { FC } from "react";

interface FormProps {
  setIsFormVisible: (visible: boolean) => void;
}
const Form: FC<FormProps> = ({ setIsFormVisible }) => {
  // Configuración de react-hook-form para colaborador
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColaboradorFormData>({
    resolver: zodResolver(ColaboradorFormSchema),
    mode: "onChange",
  });

  // Manejar envío del formulario de colaborador
  const onSubmit = async (data: ColaboradorFormData) => {
    try {
      const result = await crearColaborador(data);
      if (!result.success) {
        // Mostrar alerta de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: result.message,
        });
      }
      reset();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error al agregar colaborador:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <div className="mb-6 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50 shadow-lg">
      <h2 className="text-lg font-medium text-slate-200 mb-4 flex items-center">
        <UserPlus className="w-5 h-5 mr-2 text-cyan-400" strokeWidth={1.5} />
        Agregar nuevo colaborador
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Nombre completo
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="name"
                type="text"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="Nombre del colaborador"
                {...register("name", {
                  required: "Nombre es requerido",
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Correo electrónico
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="ejemplo@dominio.com"
                {...register("email", {
                  required: "Correo electrónico requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Dirección de correo inválida",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Cargo */}
          <div>
            <label
              htmlFor="jobRole"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Cargo
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="jobRole"
                type="text"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="Cargo o función"
                {...register("jobRole", {
                  required: "Cargo es requerido",
                })}
              />
            </div>
            {errors.jobRole && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.jobRole.message}
              </p>
            )}
          </div>

          {/* Campo Estado */}
          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Estado
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                id="status"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                {...register("status")}
              >
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Contraseña
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="Contraseña"
                {...register("password", {
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Rol */}
          <div>
            <label
              htmlFor="role"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Rol
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                id="role"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                {...register("role")}
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.role.message}
              </p>
            )}
          </div>
        </div>

        {/* Botones del formulario */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setIsFormVisible(false)}
            type="button"
            className="px-4 py-2 bg-slate-700/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600/50 transition-all flex items-center"
          >
            <XCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all flex items-center"
          >
            <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
            {isSubmitting ? "Guardando..." : "Guardar colaborador"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
