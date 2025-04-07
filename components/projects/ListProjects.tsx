"use client";

import { FC, useState, useEffect } from "react";
import {
  FolderKanban,
  FolderPlus,
  Search,
  Filter,
  Calendar,
  ListChecks,
  Check,
  X,
  Plus,
  FileEdit,
  FolderOpen,
  ListTodo,
} from "lucide-react";
import FormProject from "@/components/projects/FormProject";
import { ProyectsType } from "@/src/types/projectsType";
import FormTask from "../tasks/FormTask";
import { ColaboradoresType } from "@/src/types/colaboradorestype";

interface ListProjectsProps {
  colaboradores: ColaboradoresType[]; // Cambiado a ColaboradoresType
  projects: ProyectsType[];
  onProjectCreated?: () => void; // Callback opcional para cuando se crea un proyecto
  onTaskCreated?: () => void; // Callback opcional para cuando se crea una tarea
}

const ListProjects: FC<ListProjectsProps> = ({
  projects,
  onTaskCreated,
  colaboradores,
}) => {
  // Estados para la interfaz
  const [showForm, setShowForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState<ProyectsType | null>(
    null
  );
  const [showDetail, setShowDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProyectos, setFilteredProyectos] =
    useState<ProyectsType[]>(projects);

  // Efecto para actualizar proyectos filtrados cuando cambian los proyectos o la búsqueda
  useEffect(() => {
    if (projects && searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredProyectos(
        projects.filter(
          (project) =>
            project.name.toLowerCase().includes(lowercaseQuery) ||
            project.description.toLowerCase().includes(lowercaseQuery)
        )
      );
    } else {
      setFilteredProyectos(projects || []);
    }
  }, [projects, searchQuery]);

  // Función para mostrar detalle del proyecto
  const showProyectoDetail = (project: ProyectsType) => {
    setSelectedProyecto(project);
    setShowDetail(true);
    setShowForm(false);
    setShowTaskForm(false);
  };

  // Función para manejar la creación de una tarea
  const handleTaskCreated = () => {
    setShowTaskForm(false);
    if (onTaskCreated) onTaskCreated();
  };

  // Función para formatear el estado de la tarea
  const formatTaskStatus = (status: string) => {
    switch (status) {
      case "TODO":
        return "Por hacer";
      case "INPROGRESS":
        return "En progreso";
      case "COMPLETED":
        return "Completado";
      default:
        return status;
    }
  };

  // Función para obtener clases de estilo según el estado de la tarea
  const getTaskStatusClasses = (status: string) => {
    switch (status) {
      case "TODO":
        return "border-slate-500/30 text-slate-400 bg-slate-500/10";
      case "INPROGRESS":
        return "border-blue-500/30 text-blue-400 bg-blue-500/10";
      case "COMPLETED":
        return "border-green-500/30 text-green-400 bg-green-500/10";
      default:
        return "border-slate-500/30 text-slate-400 bg-slate-500/10";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 h-screen overflow-y-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-slate-100">
            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Proyectos
            </span>{" "}
            Activos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona tus proyectos y asigna tareas al equipo
          </p>
        </div>

        <button
          className="inline-flex items-center px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all"
          onClick={() => {
            setShowForm(!showForm);
            setShowDetail(false);
            setShowTaskForm(false);
          }}
        >
          <FolderPlus className="w-4 h-4 mr-2" strokeWidth={1.5} />
          {showForm ? "Cancelar" : "Nuevo proyecto"}
        </button>
      </div>

      {/* Formulario para crear proyecto */}
      {showForm && <FormProject />}

      {/* Formulario para crear tarea */}
      {showTaskForm && selectedProyecto && (
        <FormTask
          colaboradores={colaboradores}
          selectedProyecto={{
            id: selectedProyecto.id,
            name: selectedProyecto.name,
          }}
          setShowTaskForm={setShowTaskForm}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {/* Vista de detalle del proyecto */}
      {showDetail && selectedProyecto && (
        <div className="mb-6 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-slate-200 flex items-center">
              <FolderOpen
                className="w-5 h-5 mr-2 text-cyan-400"
                strokeWidth={1.5}
              />
              Detalle del proyecto:{" "}
              <span className="ml-2 text-cyan-400">
                {selectedProyecto.name}
              </span>
            </h2>
            <button
              onClick={() => setShowDetail(false)}
              className="p-1.5 bg-slate-700/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600/50 transition-all"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Información general del proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-2">
                  Información del proyecto
                </h3>
                <p className="text-slate-300 mb-4">
                  {selectedProyecto.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Estado:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full border ${
                        selectedProyecto.status === "ACTIVE"
                          ? "border-green-500/30 text-green-400 bg-green-500/10"
                          : "border-red-500/30 text-red-400 bg-red-500/10"
                      }`}
                    >
                      {selectedProyecto.status === "ACTIVE"
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fecha de inicio:</span>
                    <span className="text-slate-200">
                      {new Date(
                        selectedProyecto.startDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedProyecto.endDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Fecha de fin:</span>
                      <span className="text-slate-200">
                        {new Date(
                          selectedProyecto.endDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Creado:</span>
                    <span className="text-slate-200">
                      {new Date(
                        selectedProyecto.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-2">
                  Equipo de trabajo
                </h3>

                {/* Extracción de colaboradores únicos de las tareas */}
                {selectedProyecto.tasks && selectedProyecto.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {Array.from(
                      new Set(
                        selectedProyecto.tasks
                          .filter(
                            (task) => task.colaboratorId && task.colaborators
                          )
                          .map((task) => task.colaboratorId)
                      )
                    )
                      .filter((id) => id && id > 0)
                      .map((colaboratorId) => {
                        const taskWithColaborator = selectedProyecto.tasks.find(
                          (task) =>
                            task.colaboratorId === colaboratorId &&
                            task.colaborators
                        );

                        if (
                          !taskWithColaborator ||
                          !taskWithColaborator.colaborators
                        )
                          return null;

                        const colaborator = taskWithColaborator.colaborators;

                        return (
                          <div
                            key={colaborator.id}
                            className="flex items-center"
                          >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium">
                              {colaborator.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-slate-200">
                                {colaborator.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {colaborator.jobRole}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-center py-4 text-slate-400">
                    No hay colaboradores asignados
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tareas del proyecto */}
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-md font-medium text-slate-200 flex items-center">
              <ListChecks
                className="w-5 h-5 mr-2 text-cyan-400"
                strokeWidth={1.5}
              />
              Tareas
            </h3>
            <button
              onClick={() => setShowTaskForm(true)}
              className="inline-flex items-center px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4 mr-1" strokeWidth={1.5} />
              Nueva tarea
            </button>
          </div>

          {/* lista de tares */}
          {selectedProyecto.tasks && selectedProyecto.tasks.length > 0 ? (
            <div className="rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full divide-y divide-slate-700">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Tarea
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Asignado a
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
                  {selectedProyecto.tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-200">
                            {task.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {task.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {task.colaborators ? (
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-medium">
                              {task.colaborators.name.charAt(0)}
                            </div>
                            <div className="ml-2 text-sm text-slate-300">
                              {task.colaborators.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500">
                            Sin asignar
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getTaskStatusClasses(
                            task.status
                          )}`}
                        >
                          {task.status === "COMPLETED" && (
                            <Check className="w-3 h-3 mr-1" />
                          )}
                          {formatTaskStatus(task.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                          className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all"
                          title="Editar tarea"
                        >
                          <FileEdit className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 bg-slate-800/20 rounded-lg border border-slate-700">
              <ListTodo
                className="h-12 w-12 mx-auto mb-3 text-slate-500"
                strokeWidth={1.5}
              />
              <p>No hay tareas en este proyecto</p>
              <p className="text-sm mt-2">
                Crea una nueva tarea usando el botón de arriba
              </p>
            </div>
          )}
        </div>
      )}

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            className="block w-full py-2.5 pl-10 bg-slate-800/70 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-slate-800/70 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition-all">
          <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Filtros
        </button>
      </div>

      {/* Listado de proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProyectos.length > 0 ? (
          filteredProyectos.map((proyecto) => (
            <div
              key={proyecto.id}
              className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/30 transition-all group"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {proyecto.name}
                  </h3>
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                      proyecto.status === "ACTIVE"
                        ? "border-green-500/30 text-green-400 bg-green-500/10"
                        : "border-red-500/30 text-red-400 bg-red-500/10"
                    }`}
                  >
                    {proyecto.status === "ACTIVE" && (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    {proyecto.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {proyecto.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" strokeWidth={1.5} />
                    <span>
                      {new Date(proyecto.startDate).toLocaleDateString()} -
                      {proyecto.endDate
                        ? new Date(proyecto.endDate).toLocaleDateString()
                        : "En curso"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ListChecks className="w-4 h-4 mr-1" strokeWidth={1.5} />
                    <span>
                      {proyecto.tasks ? proyecto.tasks.length : 0} tareas
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Mostrar avatares de colaboradores */}
                  <div className="flex items-center -space-x-2">
                    {/* Extraer colaboradores únicos de las tareas */}
                    {proyecto.tasks &&
                      Array.from(
                        new Set(
                          proyecto.tasks
                            .filter(
                              (task) =>
                                task.colaboratorId !== null &&
                                task.colaboratorId > 0 &&
                                task.colaborators
                            )
                            .map((task) => task.colaborators?.id)
                        )
                      )
                        .slice(0, 3)
                        .map((colaboratorId) => {
                          const task = proyecto.tasks.find(
                            (t) => t.colaborators?.id === colaboratorId
                          );
                          const colaborador = task?.colaborators;

                          if (!colaborador) return null;

                          return (
                            <div
                              key={colaborador.id}
                              className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium ring-2 ring-slate-900"
                              title={colaborador.name}
                            >
                              {colaborador.name.charAt(0)}
                            </div>
                          );
                        })}

                    {/* Si hay más colaboradores de los que mostramos */}
                    {/* Si hay más colaboradores de los que mostramos */}
                    {proyecto.tasks &&
                      new Set(
                        proyecto.tasks
                          .filter(
                            (task) =>
                              task.colaboratorId !== null &&
                              task.colaboratorId > 0 &&
                              task.colaborators
                          )
                          .map((task) => task.colaborators?.id)
                      ).size > 3 && (
                        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-medium ring-2 ring-slate-900">
                          +
                          {new Set(
                            proyecto.tasks
                              .filter(
                                (task) =>
                                  task.colaboratorId !== null &&
                                  task.colaboratorId > 0 &&
                                  task.colaborators
                              )
                              .map((task) => task.colaborators?.id)
                          ).size - 3}
                        </div>
                      )}
                  </div>

                  <button
                    onClick={() => showProyectoDetail(proyecto)}
                    className="px-3 py-1 text-xs bg-slate-700/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400 bg-slate-800/20 rounded-lg border border-slate-700">
            <FolderKanban
              className="h-12 w-12 mx-auto mb-3 text-slate-500"
              strokeWidth={1.5}
            />
            <p>No se encontraron proyectos</p>
            <p className="text-sm mt-2">
              {searchQuery ? "Intenta con otra búsqueda o" : "Para comenzar,"}{" "}
              <button
                className="text-cyan-400 hover:underline"
                onClick={() => {
                  setShowForm(true);
                  setSearchQuery("");
                }}
              >
                crea un nuevo proyecto
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProjects;
