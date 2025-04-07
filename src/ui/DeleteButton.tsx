// components/common/DeleteButton.tsx
"use client";

import { FC, useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { getButtonStyle } from "../utils/css";

// Importamos la interfaz DeleteResponse

interface DeleteButtonProps {
  entityId: string | number;
  entityType: "colaborador" | "tarea" | "proyecto";
  entityName: string;
  // Ahora aceptamos una función que devuelve Promise<any> o Promise<DeleteResponse>
  onDelete: (
    id: string | number,
    type: string
  ) => Promise<{ success: boolean; message?: string }>;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  entityId,
  entityType,
  entityName,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Esta función maneja internamente la conversión de tipos
  const handleDeleteClick = async () => {
    // Mostrar confirmación con SweetAlert
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      html: `¿Deseas eliminar ${
        entityType === "colaborador" ? "al" : "la"
      } ${entityType}: <span class="font-medium text-cyan-400">${entityName}</span>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      background: "#1e293b",
      color: "#e2e8f0",
      iconColor: "#f59e0b",
      backdrop: "rgba(15, 23, 42, 0.8)",
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      try {
        setIsDeleting(true);
        // Llamamos a la función onDelete y capturamos el resultado
        const response = await onDelete(entityId, entityType);

        // Verificamos si la respuesta tiene un campo "success"
        const isSuccessful = response?.success !== false;

        // Mostrar mensaje según el resultado
        if (isSuccessful) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `${
              entityType === "colaborador" ? "El" : "La"
            } ${entityType} ha sido eliminado correctamente.`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
            background: "#1e293b",
            color: "#e2e8f0",
            iconColor: "#10b981",
          });
        } else {
          // Si hay un error en la respuesta
          Swal.fire({
            title: "Error",
            text:
              response?.message ||
              `No se pudo eliminar ${
                entityType === "colaborador" ? "el" : "la"
              } ${entityType}.`,
            icon: "error",
            confirmButtonColor: "#3b82f6",
            background: "#1e293b",
            color: "#e2e8f0",
            iconColor: "#ef4444",
          });
        }
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: "Error",
          text: `No se pudo eliminar ${
            entityType === "colaborador" ? "el" : "la"
          } ${entityType}.`,
          icon: "error",
          confirmButtonColor: "#3b82f6",
          background: "#1e293b",
          color: "#e2e8f0",
          iconColor: "#ef4444",
        });
        console.error("Error al eliminar:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className={`p-1.5 ${getButtonStyle} border rounded-lg transition-all`}
      title={`Eliminar ${entityType}`}
      disabled={isDeleting}
    >
      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
    </button>
  );
};

export default DeleteButton;
