import ListProjects from "@/components/projects/ListProjects";
import { obtenerColaboradores } from "@/server/colaboradores/colaboradores";
import { getProjects } from "@/server/projects/projects";

const ProyectosPage = async () => {
  const projects = await getProjects();
  const colaboradores = await obtenerColaboradores();
  return <ListProjects projects={projects} colaboradores={colaboradores} />;
};

export default ProyectosPage;
