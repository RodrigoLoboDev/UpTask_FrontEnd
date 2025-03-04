import { z } from 'zod'
import { TaskSchema } from './TaskType'

// Schemas
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string()
})

export const ProjectsSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const ProjectTaskSchema = ProjectSchema.extend({
    tasks: z.array(TaskSchema.omit({completedBy: true}))
})

// Types
export type ProjectType = z.infer<typeof ProjectSchema >
export type ProjectTaskType = z.infer<typeof ProjectTaskSchema >
export type DraftProjectType = Pick<ProjectType, 'projectName' | 'clientName' | 'description'>