import api from "@/lib/axios";
import { ProjectType } from "@/types/ProjectType";
import { DraftTaskType, TaskSchema, TaskType } from "@/types/TaskType";
import { isAxiosError } from "axios";


type TaskAPIType = {
    formData: DraftTaskType,
    projectID: ProjectType['_id']
    taskID: TaskType['_id']
    status: TaskType['status']
}

export async function createTask({formData, projectID} : Pick<TaskAPIType, 'formData' | 'projectID'>) {    
    try {
        const { data } = await api.post<string>(`/projects/${projectID}/tasks`, formData)        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskByID({projectID, taskID} : Pick<TaskAPIType, 'projectID' | 'taskID'>) {    
    try {
        const { data } = await api(`/projects/${projectID}/tasks/${taskID}`)        
        const result = TaskSchema.safeParse(data.data)
        
        if (result.success) {
            return result.data
        }    
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editTask({formData, projectID, taskID} : Pick<TaskAPIType, 'formData' | 'projectID' | 'taskID'>) {    
    try {
        const { data } = await api.put<string>(`/projects/${projectID}/tasks/${taskID}`, formData)
        return data    
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectID, taskID} : Pick<TaskAPIType, 'projectID' | 'taskID'>) {    
    try {
        const { data } = await api.delete<string>(`/projects/${projectID}/tasks/${taskID}`)
        return data   
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatusTask({projectID, taskID, status} : Pick<TaskAPIType, 'projectID' | 'taskID' | 'status'>) {    
    try {
        const { data } = await api.post<string>(`/projects/${projectID}/tasks/${taskID}/status`, {status})
        return data   
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}