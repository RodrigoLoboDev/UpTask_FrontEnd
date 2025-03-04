import { z } from 'zod'
import { ProfileSchema } from './AuthType'

export const NoteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: ProfileSchema,
    task: z.string(),
    createdAt: z.string()
})
export const NotesSchema = z.array(NoteSchema)

export type Note = z.infer<typeof NoteSchema>
export type NoteForm = Pick<Note, 'content'>
