import { z } from 'zod'

export const TeamSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string().email()
})

export const TeamSchemaArray = z.array(TeamSchema)

export type Team = z.infer<typeof TeamSchema>
export type TeamMemberForm = Pick<Team, 'email'>