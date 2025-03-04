import { deleteTask } from "@/api/TaskAPI"
import { TaskProjectType } from "@/types/TaskType"
import { useDraggable } from "@dnd-kit/core"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type TaskCardProps = {
    task: TaskProjectType
    canEdit: boolean
}

const TaskCard = ({ task, canEdit }: TaskCardProps) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id // tenemos que pasarle un id unico en este caso el id de las tareas entonces cada draggable tendra el id de la tarea que arrastramos
    })

    const param = useParams()
    const projectID = param.projectID!
    const taskID = task._id

    const navigate = useNavigate()
    const location = useLocation()

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteTask,
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
            navigate(location.pathname)
        },
    })

    const handleClick = () => {
        const data = {
            projectID,
            taskID
        }
        mutate(data)
    }

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;

    return (
        <li className=" p-5 bg-white border border-slate-300 flex justify-between gap-3">
            <div
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                style={style}
                className=" min-w-0 flex flex-col gap-y-4"
            >
                <button
                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                    className=" text-xl font-bold text-slate-600 text-left"
                    type="button"
                >{task.name}</button>
                <p className=" text-slate-500">{task.description}</p>
            </div>

            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button
                                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                >
                                    Ver Tarea
                                </button>
                            </Menu.Item>
                            {canEdit && (
                                <>
                                    <Menu.Item>
                                        <button
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                        >
                                            Editar Tarea
                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={handleClick}
                                        >
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>
                                </>
                            )}

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}

export default TaskCard