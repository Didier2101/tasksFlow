"use client";

import { FC, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Mail,
  Briefcase,
  ListTodo,
  ClipboardList,
} from "lucide-react";
import Logo from "@/src/ui/Logo";
import Form from "@/components/colaboradores/Form";
import { ColaboradoresType } from "@/src/types/colaboradorestype";

interface ListColaboradoresProps {
  colaboradores: ColaboradoresType[];
}

const ListColaboradores: FC<ListColaboradoresProps> = ({ colaboradores }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Estado para mostrar las tareas de un colaborador
  const [showTasks, setShowTasks] = useState(false);
  const [selectedColaboradorTasks, setSelectedColaboradorTasks] =
    useState<ColaboradoresType | null>(null);

  const showColaboradorTasks = (colaborador: ColaboradoresType) => {
    setSelectedColaboradorTasks(colaborador);
    setShowTasks(true);
  };

  // Filtrar colaboradores basado en la búsqueda
  const filteredColaboradores = colaboradores.filter(
    (colaborador) =>
      colaborador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colaborador.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colaborador.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900  to-slate-800 h-screen overflow-y-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-slate-100">
            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Colaboradores
            </span>{" "}
            del equipo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona la información de tu equipo de trabajo
          </p>
        </div>
        <div className="flex items-center gap-8">
          <Logo />
          <button
            className="inline-flex items-center px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            <UserPlus className="w-4 h-4 mr-2" strokeWidth={1.5} />
            {isFormVisible ? "Cancelar" : "Nuevo colaborador"}
          </button>
        </div>
      </div>
      {/* Formulario para agregar colaborador */}
      {isFormVisible && <Form setIsFormVisible={setIsFormVisible} />}
      {/* Vista de tareas del colaborador */}
      {showTasks && selectedColaboradorTasks && (
        <div className="mb-6 bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-slate-200 flex items-center">
              <ClipboardList
                className="w-5 h-5 mr-2 text-cyan-400"
                strokeWidth={1.5}
              />
              Tareas de:{" "}
              <span className="ml-2 text-cyan-400">
                {selectedColaboradorTasks.name}
              </span>
            </h2>
            <button
              onClick={() => setShowTasks(false)}
              className="p-1.5 bg-slate-700/50 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600/50 transition-all"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {selectedColaboradorTasks.tasks &&
          selectedColaboradorTasks.tasks.length > 0 ? (
            <div className="rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full divide-y divide-slate-700">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Proyecto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
                  {selectedColaboradorTasks.tasks.map((task) => (
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
                        <div className="text-sm text-slate-300">
                          {task.description}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border`}
                        >
                          {task.status}
                          {task.status === "COMPLETED" && (
                            <Check className="w-3 h-3 ml-1" />
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">
                        {task.createdAt &&
                          new Date(task.createdAt).toLocaleDateString()}
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
              <p>No hay tareas asignadas</p>
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
            placeholder="Buscar colaboradores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-slate-800/70 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition-all">
          <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Filtros
        </button>
      </div>
      {/* Lista de colaboradores */}
      <div className="rounded-xl border bg-slate-900 backdrop-blur-lg border-slate-700 overflow-hidden">
        <table className="w-full divide-y divide-slate-700">
          <thead className="bg-slate-800/70">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Colaborador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Registro
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
            {filteredColaboradores.length > 0 ? (
              filteredColaboradores.map((colaborador) => (
                <tr
                  key={colaborador.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium text-xl">
                          {colaborador.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-200">
                          {colaborador.name}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center mt-1">
                          <Mail className="w-3 h-3 mr-1" strokeWidth={1.5} />
                          {colaborador.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-300">
                      <Briefcase
                        className="w-4 h-4 mr-2 text-slate-400"
                        strokeWidth={1.5}
                      />
                      {colaborador.jobRole}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {colaborador.createdAt &&
                      new Date(colaborador.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => showColaboradorTasks(colaborador)}
                        className="p-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
                        title="Ver tareas"
                      >
                        <ListTodo className="w-4 h-4" strokeWidth={1.5} />
                      </button>

                      <button
                        className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all"
                        title="Editar"
                      >
                        <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400 bg-slate-800/20"
                >
                  <Users
                    className="h-12 w-12 mx-auto mb-3 text-slate-500"
                    strokeWidth={1.5}
                  />
                  <p className="mb-1">No se encontraron colaboradores</p>
                  <p className="text-sm">
                    {searchQuery
                      ? "Intenta con otros términos de búsqueda"
                      : "Agrega un nuevo colaborador para comenzar"}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Información del número de colaboradores */}
      <div className="mt-4 text-sm text-slate-400 flex items-center">
        <Users className="w-4 h-4 mr-2" strokeWidth={1.5} />
        Total: {filteredColaboradores.length} colaboradores
        {searchQuery && (
          <>
            <span className="mx-2">•</span>
            Filtrando por:{" "}
            <span className="text-cyan-400 ml-1">{searchQuery}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ListColaboradores;
