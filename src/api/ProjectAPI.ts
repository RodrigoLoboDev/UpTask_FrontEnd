import api from "@/lib/axios";
import { DraftProjectType, ProjectsSchema, ProjectType, ProjectTaskSchema } from "@/types/ProjectType";
import { isAxiosError } from "axios";


export async function createProject(formData : DraftProjectType) {    
    try {
        const { data } = await api.post<string>('/projects', formData)        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects() {    
    try {
        const { data } = await api('/projects')                
        const result = ProjectsSchema.safeParse(data.data)        
        
        if (result.success) {
            return result.data
        }    
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectByID(id: ProjectType['_id']) {    
    try {
        const { data } = await api(`/projects/${id}`)
        const result = ProjectTaskSchema.safeParse(data.data)
        
        if (result.success) {
            return result.data
        }    
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectAPIType = {
    formData: DraftProjectType,
    projectID: ProjectType['_id']
}

export async function editProject({formData, projectID} : ProjectAPIType) {    
    try {
        const { data } = await api.put<string>(`/projects/${projectID}`, formData)
        return data    
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id: ProjectType['_id']) {    
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data   
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}