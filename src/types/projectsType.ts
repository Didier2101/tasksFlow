import { Status, StatusTasks } from "@prisma/client";

export interface ProyectsType {
    id: number;
    name: string;
    description: string;
    status: string;
    startDate: Date;
    tasks: TaskType[]
    endDate: Date;
    createdAt: Date;
}

export interface TaskType {
    id: number;
    title: string;
    description: string;
    status: StatusTasks;
    projectId: number;
    colaboratorId: number | null;
    colaborators: {
        id: number;
        name: string;
        email: string;
        jobRole: string;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }
    createdAt: Date;
    completedAt: Date;
}


