import { ProjectFormData } from "@/schemas/projects/projectSchema";
import { createProject } from "@/server/projects/projects";
import { AlertCircle, FolderPlus, Save } from "lucide-react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormProjectProps {
  setShowForm: (show: boolean) => void;
}
const FormProject: FC<FormProjectProps> = ({ setShowForm }) => {
  // Formulario para proyecto
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    mode: "all",
  });

  // Funciones para formularios
  const onSubmit = async (data: ProjectFormData) => {
    try {
      const result = await createProject(data);
      if (!result.success) {
        // Mostrar alerta de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          background: "#1e293b",
          color: "#e2e8f0",
          iconColor: "#10b981",
        });
      } else {
        // Mostrar alerta de éxito
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: result.message,
          background: "#1e293b",
          color: "#e2e8f0",
          iconColor: "#10b981",
        });
        reset();
        setShowForm(false); // Cerrar el formulario después de enviar
      }
    } catch (error) {
      console.error("Error al agregar proyecto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado",
      });
    }
  };
  return (
    <div className="mb-6 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-lg">
      <h2 className="text-lg font-medium text-slate-200 mb-4 flex items-center">
        <FolderPlus className="w-5 h-5 mr-2 text-cyan-400" strokeWidth={1.5} />
        Crear nuevo proyecto
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del proyecto */}
          <div>
            <label
              htmlFor="nombre"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Nombre del proyecto
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="nombre"
                type="text"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="Nombre del proyecto"
                {...register("name", {
                  required: "El nombre es requerido",
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

          {/* Estado del proyecto */}
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

          {/* Fecha de inicio */}
          <div>
            <label
              htmlFor="fechaInicio"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Fecha de inicio
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="fechaInicio"
                type="date"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                {...register("startDate", {
                  required: "La fecha de inicio es requerida",
                })}
              />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* Fecha estimada de fin */}
          <div>
            <label
              htmlFor="fechaFin"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Fecha estimada de fin
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="fechaFin"
                type="date"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                {...register("endDate")}
              />
            </div>
          </div>
          {errors.endDate && (
            <p className="mt-1 text-sm text-rose-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="text-sm font-medium text-slate-300 mb-1 block"
          >
            Descripción
          </label>
          <div className="relative rounded-md shadow-sm">
            <textarea
              id="descripcion"
              rows={3}
              className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              placeholder="Describe el proyecto"
              {...register("description", {
                required: "La descripción es requerida",
              })}
            ></textarea>
          </div>
          {errors.description && (
            <p className="mt-1 text-sm text-rose-400 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Botones del formulario */}
        <div className="flex justify-end gap-3 pt-2">
          {/* <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-slate-700/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600/50 transition-all flex items-center"
          >
            <XCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Cancelar
          </button> */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all flex items-center"
          >
            <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
            {isSubmitting ? "Guardando..." : "Guardar proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProject;
