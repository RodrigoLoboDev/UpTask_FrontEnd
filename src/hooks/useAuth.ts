import { getUser } from '@/api/AuthAPI'
import { ProjectType } from '@/types/ProjectType'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const isAuthorization = (manager : ProjectType['manager']) => manager.toString() === data?._id.toString()

    return {
        data, 
        isError, 
        isLoading,
        isAuthorization
    }
}