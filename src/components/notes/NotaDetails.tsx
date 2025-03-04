import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/NoteType"
import { formatearFecha } from "@/utils/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const NotaDetails = ({nota} : {nota : Note}) => {

    const params = useParams()
    const location = useLocation()
    const projectId = params.projectID!
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const { data, isLoading } = useAuth()

    if (isLoading) return <p>Cargando...</p>;

    const canDelete = useMemo(() => data?._id.toString() === nota.createdBy._id.toString(), [data])

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['Notes']})
        }
    })

    const handleDeleteNote = () => {
        const data = {
            projectId,
            taskId,
            noteId: nota._id
        }
        mutate(data)
    }
    
  return (
    <div className=" p-3 flex justify-between items-center">
        <div>
            <p>{nota.content} por: <span className=" font-bold">{nota.createdBy.name}</span></p>
            <p className=" text-xs text-slate-500">{formatearFecha(nota.createdAt)}</p>
        </div>
        {canDelete && (
            <button
                onClick={handleDeleteNote}
                className=" text-red-700 border border-red-600 bg-red-200 hover:bg-red-300 transition-colors py-1 px-3 rounded-lg"
                type="button"
            >Eliminar</button>
        )}
    </div>
  )
}

export default NotaDetails