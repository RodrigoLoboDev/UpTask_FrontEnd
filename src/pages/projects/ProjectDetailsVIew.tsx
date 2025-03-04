import { getProjectByID } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

const ProjectDetailsVIew = () => {

    const { data : user, isLoading: authLoading, isAuthorization } = useAuth()

    const navigate = useNavigate()
    const param = useParams()
    const projectID = param.projectID!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectID],
        queryFn: () => getProjectByID(projectID),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading && authLoading) return 'cargando...'
    if (isError) return <Navigate to={'/404'} />
    
    if (data) return (
        <>
            <h1 className=" text-5xl font-black">{data.projectName}</h1>
            <p className=" text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isAuthorization(data.manager) && (
                <nav className=" my-5 flex gap-3">
                    <button
                        type="button"
                        className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >Agregar Tarea</button>
                    <Link
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to={`${location.pathname}/team`}
                    >Colaboradores</Link>
                </nav>
            )}

            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsVIew