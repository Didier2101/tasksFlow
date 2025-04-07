import ListColaboradores from "@/components/colaboradores/ListColaboradores";
import { obtenerColaboradores } from "@/server/colaboradores/colaboradores";

const ColaboradoresPage = async () => {
  // Estado para mostrar/ocultar el formulario de colaborador

  // Estado para mostrar/ocultar el formulario de usuario

  // // Función para mostrar las tareas del colaborador
  // const showColaboradorTasks = (colaborador: Colaborador) => {
  //   setSelectedColaboradorTasks(colaborador);
  //   setShowTasks(true);
  // };
  const colaboradores = await obtenerColaboradores();
  return (
    <div>
      <ListColaboradores colaboradores={colaboradores} />
    </div>
  );
};

export default ColaboradoresPage;
