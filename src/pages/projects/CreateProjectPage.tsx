import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import { DraftProjectType } from "@/types/ProjectType"
import { createProject } from "@/api/ProjectAPI"
import { toast } from 'react-toastify'
import { useMutation } from "@tanstack/react-query"

const CreateProjectPage = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors} } = useForm<DraftProjectType>()

    const { mutate } = useMutation({
        mutationFn: createProject,
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
    
    const handleForm = (data : DraftProjectType) => mutate(data)

  return (
    <div className=" max-w-3xl mx-auto">
        <h1 className=" text-5xl font-black">Crear Proyecto</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
                value="Crear Proyecto" 
            />
        </form>
    </div>
  )
}

export default CreateProjectPage