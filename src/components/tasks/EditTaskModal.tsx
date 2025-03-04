import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DraftTaskType, TaskType } from '@/types/TaskType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';

type EditTaskModalProps = {
    data: TaskType
}

export default function EditTaskModal({data} : EditTaskModalProps) {

    const param = useParams()
    const projectID = param.projectID!

    const location = useLocation()
    const queryParam = new URLSearchParams(location.search)
    const taskID = queryParam.get('editTask')!

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<DraftTaskType>({
        defaultValues: data
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: editTask,
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

    const handleForm = (formData: DraftTaskType) => {
        const data = {
            formData,
            projectID,
            taskID
        }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                >

                                    <TaskForm register={register} errors={errors} />

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Cambios'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}