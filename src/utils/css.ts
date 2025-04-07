export const formatTaskStatus = (status: string) => {
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
export const getTaskStatusClasses = (status: string) => {
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

// Estilo según el tipo de entidad
export const getButtonStyle = (entityType: string) => {
    switch (entityType) {
        case "colaborador":
            return "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20";
        case "tarea":
            return "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20";
        case "proyecto":
            return "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20";
        default:
            return "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20";
    }
};