import { useQuery } from "@tanstack/react-query"
import AddNoteForm from "./AddNoteForm"
import { getAllNotes } from "@/api/NoteAPI"
import { useLocation, useParams } from "react-router-dom"
import NotaDetails from "./NotaDetails"

const NotesPanel = () => {

    const params = useParams()
    const location = useLocation()
    const projectId = params.projectID!
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['Notes'],
        queryFn: () => getAllNotes({projectId, taskId}),
        retry: 1
    })

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>error</p>

  return (
    <>
        <AddNoteForm />
        <div className=" divide-y divide-gray-100 mt-10">
            {data && data.length && (
                <>
                    <p className=" font-bold text-2xl text-slate-600 my-5">Notas:</p>
                    {data.map(nota => <NotaDetails key={nota._id} nota={nota} />)}
                </>
            )}
        </div>
    </>
  )
}

export default NotesPanel