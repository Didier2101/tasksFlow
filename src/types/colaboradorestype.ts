import { Status, StatusTasks } from "@prisma/client";

export interface ColaboradoresType {
    id: number;
    name: string;
    email: string;
    jobRole: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskType[];
    users: UserType[];
}

export interface TaskType {
    id: number;
    title: string;
    description: string;
    status: StatusTasks;
    projectId: number;
    colaboratorId: number | null;
    createdAt: Date;
    completedAt: Date;
}

export interface UserType {
    id: number;
    password: string;
    colaboratorId: number;
    createdAt: Date;
    updatedAt: Date;
    income: Income[];
}

export interface Income {
    id: number;
    entryDate: Date;
    exitDate: Date | undefined;
    usersId: number;
}