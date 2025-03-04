import { z } from 'zod'
import { ProfileSchema } from './AuthType'

const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: ProfileSchema,
        status: z.string()
    })),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type TaskType = z.infer<typeof TaskSchema >
export type TaskProjectType = Pick<TaskType, '_id' | 'name' | 'description' | 'project' | 'status' | 'createdAt' | 'updatedAt'>
export type DraftTaskType = Pick<TaskType, 'name' | 'description'>