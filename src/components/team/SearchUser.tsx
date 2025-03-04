import { addUserTeam } from "@/api/TeamAPI"
import { ProjectType } from "@/types/ProjectType"
import { Team } from "@/types/TeamTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const SearchUser = ({user, projectID} : {user: Team, projectID: ProjectType['_id']}) => {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserTeam,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['ProjectTeam', projectID]})
            navigate(location.pathname)
        }
    })

    const handleClick = async () => {
        const data = {
            userID: user._id,
            projectID
        }
        mutate(data)
    }

    return (
        <>
            <p className=" mt-10 text-center font-bold">Resultado:</p>
            <div className=" flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    onClick={handleClick}
                    type="button"
                    className=" text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                >Agregar al Proyecto</button>
            </div>
        </>
    )
}

export default SearchUser