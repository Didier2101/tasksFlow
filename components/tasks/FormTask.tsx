import { TaskFormData } from "@/schemas/tasks/tasksSchema";
import { createTask } from "@/server/tasks/tasks";
import { ColaboradoresType } from "@/src/types/colaboradorestype";
import { AlertCircle, FilePlus, Save, XCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormTaskProps {
  colaboradores: ColaboradoresType[];
  selectedProyecto: {
    id: number;
    name: string;
  };
  setShowTaskForm: (show: boolean) => void; // Añadimos esta prop
  onTaskCreated?: () => void; // Añadimos callback opcional
}

const FormTask: FC<FormTaskProps> = ({
  selectedProyecto,
  setShowTaskForm,
  colaboradores,
}) => {
  // Formulario para tarea
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    mode: "all",
    defaultValues: {
      status: "TODO",
    },
  });

  // Función para crear una nueva tarea
  const onSubmit = async (data: TaskFormData) => {
    // validar el tipo de dato que estamos enviando al server
    console.log("Data a enviar:", data);
    try {
      const result = await createTask(data); // Llama a la función para crear la tarea
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
        setShowTaskForm(false); // Ocultar el formulario después de crear la tarea
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado",
        background: "#1e293b",
        color: "#e2e8f0",
        iconColor: "#10b981",
      });
    }
  };

  return (
    <div className="mb-6 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-lg">
      <h2 className="text-lg font-medium text-slate-200 mb-4 flex items-center">
        <FilePlus className="w-5 h-5 mr-2 text-cyan-400" strokeWidth={1.5} />
        Agregar tarea a:{" "}
        <span className="ml-2 text-cyan-400">{selectedProyecto.name}</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título de la tarea */}
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Título de la tarea
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="title"
                type="text"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                placeholder="Título de la tarea"
                {...register("title", {
                  required: "El título es requerido",
                })}
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-rose-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Estado */}
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
                <option value="TODO">Por hacer</option>
                <option value="INPROGRESS">En progreso</option>
                <option value="COMPLETED">Completado</option>
              </select>
            </div>
          </div>

          {/* Colaborador asignado */}
          <div className="md:col-span-2">
            <label
              htmlFor="colaboratorId"
              className="text-sm font-medium text-slate-300 mb-1 block"
            >
              Asignar a
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                id="colaboratorId"
                className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                {...register("colaboratorId")}
              >
                <option value="">Sin asignar</option>
                {/* Aquí iría el mapeo de colaboradores desde una API */}
                {colaboradores.map((colaborador) => (
                  <option key={colaborador.id} value={colaborador.id}>
                    {colaborador.name} - {colaborador.jobRole}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Descripción de la tarea */}
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-300 mb-1 block"
          >
            Descripción
          </label>
          <div className="relative rounded-md shadow-sm">
            <textarea
              id="description"
              rows={3}
              className="block w-full py-2.5 px-3 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              placeholder="Describe la tarea"
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

        {/* Agregamos el campo oculto para projectId */}
        <input
          type="hidden"
          {...register("projectId")}
          value={selectedProyecto.id || ""}
        />

        {/* Botones del formulario */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowTaskForm(false)}
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
            {isSubmitting ? "Guardando..." : "Guardar tarea"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTask;
