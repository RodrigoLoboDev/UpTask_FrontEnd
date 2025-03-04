import api from "@/lib/axios";
import { ProjectType } from "@/types/ProjectType";
import { Team, TeamMemberForm, TeamSchemaArray } from "@/types/TeamTypes";
import { isAxiosError } from "axios";

export async function findUserTeam({formData, projectID} : {formData: TeamMemberForm, projectID: ProjectType['_id']}) {
    try {
        const url = `/projects/${projectID}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserTeam({userID, projectID} : {userID: Team['_id'], projectID: ProjectType['_id']}) {
    try {
        const url = `/projects/${projectID}/team`
        const { data } = await api.post<string>(url, {id: userID})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam({projectID} : {projectID: ProjectType['_id']}) {
    try {
        const url = `/projects/${projectID}/team`
        const { data } = await api(url)
        const result = TeamSchemaArray.safeParse(data)        
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserTeam({userID, projectID} : {userID: Team['_id'], projectID: ProjectType['_id']}) {
    try {
        const url = `/projects/${projectID}/team/${userID}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}