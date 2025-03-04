import { getTaskByID } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";

const EditTaskData = () => {

    const param = useParams()
    const projectID = param.projectID!
    

    const location = useLocation()
    const queryParam = new URLSearchParams(location.search)
    const taskID = queryParam.get('editTask')!


    const { data, isError } = useQuery({
        queryKey: ['task', taskID],
        queryFn: () => getTaskByID({projectID, taskID}),
        enabled: !!taskID
    })

    if (isError) return <Navigate to={'/404'} />
    
    if (data) return <EditTaskModal data={data}/>
}

export default EditTaskData