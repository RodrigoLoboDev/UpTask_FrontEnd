import api from "@/lib/axios";
import { Note, NoteForm, NotesSchema } from "@/types/NoteType";
import { ProjectType } from "@/types/ProjectType";
import { TaskType } from "@/types/TaskType";
import { isAxiosError } from "axios";

export async function createNote({formData, projectId, taskId} : {formData : NoteForm, projectId : ProjectType['_id'], taskId : TaskType['_id']}) {    
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/note`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllNotes({projectId, taskId} : {projectId : ProjectType['_id'], taskId : TaskType['_id']}) {    
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/note`
        const { data } = await api.get(url)
        const result = NotesSchema.safeParse(data.data)        
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : {projectId : ProjectType['_id'], taskId : TaskType['_id'], noteId : Note['_id']}) {    
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/note/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}