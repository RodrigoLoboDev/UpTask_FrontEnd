import { editProject, getProjectByID } from "@/api/ProjectAPI"
import ProjectForm from "@/components/projects/ProjectForm"
import { DraftProjectType } from "@/types/ProjectType"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const EditProjectPage = () => {

    const navigate = useNavigate()
    const param = useParams()
    const projectID = param.projectID!
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectID],
        queryFn: () => getProjectByID(projectID),
        retry: false
      })

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<DraftProjectType>()
    
    if (data) {
        setValue('projectName', data.projectName)
        setValue('clientName', data.clientName)
        setValue('description', data.description)
    }

    const { mutate } = useMutation({
        mutationFn: editProject,
        onError: (error) => {
        toast.error(error.message, {
            pauseOnHover: false,
            pauseOnFocusLoss: false
        });
        },
        onSuccess: (data) => {
        toast.success(data, {
            pauseOnHover: false,
            pauseOnFocusLoss: false
        });
        navigate('/')
        },
    })
    
    const handleForm = (formData : DraftProjectType) => {
        const data = {
            formData,
            projectID
        }
        mutate(data)        
    }

    if (isLoading) return 'cargando...'  
    if (isError) return <Navigate to={'/404'} />

  return (
    <div className=" max-w-3xl mx-auto">
        <h1 className=" text-5xl font-black">Editar Proyecto</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">En el siguiente formulario edita tu proyecto</p>

        <nav className=" my-5">
            <Link
                to={'/'}
                className=" bg-purple-600 hover:bg-purple-800 px-10 py-2 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            >Volver a Proyectos</Link>
        </nav>

        
        <form
            className=" mt-10 bg-white shadow-lg rounded-lg p-10"
            onSubmit={handleSubmit(handleForm)}        
        >
            <ProjectForm 
                register={register}
                errors={errors}
            />

            <input 
                className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full py-2 px-3 text-white uppercase font-bold cursor-pointer transition-colors"
                type="submit" 
                value="Guardar Cambios" 
            />
        </form>
    </div>
  )
}

export default EditProjectPage