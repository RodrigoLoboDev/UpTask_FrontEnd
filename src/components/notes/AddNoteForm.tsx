import { createNote } from "@/api/NoteAPI"
import { NoteForm } from "@/types/NoteType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ErrorMessage"



const AddNoteForm = () => {

    const params = useParams()
    const projectId = params.projectID!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const initialValues : NoteForm = {
        content: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['Notes']})
        }
    })

    const createNoteForm = (formData: NoteForm) => {
        const data = {
            formData,
            projectId,
            taskId
        }
        mutate(data)
    }

    return (
        <>
            <form
                className=" space-y-3"
                onSubmit={handleSubmit(createNoteForm)}
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label className=" font-bold" htmlFor="content">Crear Nota</label>
                    <input
                        id="content"
                        placeholder="Contenido de la nota"
                        className=" w-full p-3 border border-gray-300"
                        type="text"
                        {...register("content", {
                            required: "El contenido es obligatorio"
                        })}
                    />
                    {errors.content && (
                        <ErrorMessage>{errors.content.message}</ErrorMessage>
                    )}
                </div>
                <input
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full p-2 text-white font-bold text-center cursor-pointer"
                    type="submit"
                    value="Crear Nota" />
            </form>
        </>
    )
}

export default AddNoteForm