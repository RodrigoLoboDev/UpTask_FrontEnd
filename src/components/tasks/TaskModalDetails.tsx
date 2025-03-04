import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskByID, updateStatusTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatearFecha } from '@/utils/index';
import { TaskStatus } from '@/types/TaskType';
import NotesPanel from '../notes/NotesPanel';


const statusDiccionary: { [key: string]: string } = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    completed: 'Completado',
}


export default function TaskModalDetails() {

    const param = useParams()
    const projectID = param.projectID!

    const navigate = useNavigate()

    const location = useLocation()
    const queryParam = new URLSearchParams(location.search)
    const taskID = queryParam.get('viewTask')!

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskID],
        queryFn: () => getTaskByID({ projectID, taskID }),
        retry: false,
        enabled: !!taskID
    })

    const show = taskID ? true : false;

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
            queryClient.invalidateQueries({ queryKey: ['task', taskID] })
            toast.success(data, {
                pauseOnHover: false,
                pauseOnFocusLoss: false
            });
            navigate(location.pathname, { replace: false })
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = {
            projectID,
            taskID,
            status
        }
        mutate(data)
    }

    // if (isError) return <Navigate to={'/404'} />
    if (isError) {
        setTimeout(() => {
            toast.error(error.message, { toastId: 'error' })
        }, 1000);
        return <Navigate to={`/projects/${projectID}`} />
    }


    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatearFecha(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatearFecha(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    <div>
                                        <p>Historial de cambios:</p>
                                        <ol className=' list-decimal'>
                                            {data.completedBy.map((history) => (
                                                <li key={history._id}>
                                                    <p>
                                                        <span className=' text-slate-600 font-bold'>Estado {statusDiccionary[history.status]} por:</span> {' '}
                                                        {history.user.name}
                                                    </p>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                    {/* {data.completedBy && (
                                        <p>
                                            <span className=' text-slate-600 font-bold'>Estado Actualizado por:</span> {' '}
                                            {data.completedBy.name}
                                        </p>
                                    )} */}

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: {statusDiccionary[data.status]}</label>

                                        <select
                                            className=' w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusDiccionary).map(([key, values]) => (
                                                <option value={key} key={key}>{values}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}