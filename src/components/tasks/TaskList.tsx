import { TaskProjectType, TaskStatus } from "@/types/TaskType"
import TaskCard from "./TaskCard"
import DropTask from "./DropTask"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatusTask } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { ProjectTaskType } from "@/types/ProjectType"

type TaskListProps = {
    tasks: TaskProjectType[]
    canEdit: boolean
}

type GroupedTasks = {
    [key: string]: TaskProjectType[]
}

const initialStatusGroup: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const statusDiccionary: { [key: string]: string } = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    completed: 'Completado',
}

const statusStyle: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

const TaskList = ({ tasks, canEdit }: TaskListProps) => {

    const navigate = useNavigate()
    const param = useParams()
    const projectID = param.projectID!

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);


    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatusTask,
        onError: (error) => {
            toast.error(error.message, {
                pauseOnHover: false,
                pauseOnFocusLoss: false
            });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
            toast.success(data, {
                pauseOnHover: false,
                pauseOnFocusLoss: false
            });
            navigate(location.pathname, { replace: false })
        },
    })

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && over.id) {
            const taskID = active.id.toString()
            const status = over.id as TaskStatus
            const data = {
                projectID,
                taskID,
                status
            }
            mutate(data)

            queryClient.setQueryData(['editProject', projectID], (prevData : ProjectTaskType) => {
                // console.log(prevData);
                const updatedTasks = prevData.tasks.map((task) => {
                    if (task._id === active.id) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks: updatedTasks
                }
            })
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                            <h3 className={` capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyle[status]}`}>{statusDiccionary[status]}</h3>

                            <DropTask status={status} />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}

export default TaskList