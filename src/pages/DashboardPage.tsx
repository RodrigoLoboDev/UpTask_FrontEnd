import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { getProjects } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '@/hooks/useAuth'
import DeleteProjectModal from '@/components/projects/DeleteProjectModal'

const DashboardPage = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { isLoading: authLoading, isAuthorization } = useAuth()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
        retry: 1
    })

    if (isLoading && authLoading) return 'cargando...'

    if (isError) return <Navigate to={'/auth/login'} />

    if (data) return (
        <>
            <h1 className=" text-5xl font-black">Mis Proyectos</h1>
            <p className=" text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

            <nav className=" my-5">
                <Link
                    to={'/projects/create'}
                    className=" bg-purple-600 hover:bg-purple-800 px-10 py-2 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                >Nuevo Proyecto</Link>
            </nav>

            {data && data.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map((project) => (
                        <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <div className=' mb-2'>
                                        {isAuthorization(project.manager) ?
                                            <p className=' font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5'>Manager</p> :
                                            <p className=' font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5'>Colaborador</p>}
                                    </div>
                                    <Link to={`projects/${project._id}`}
                                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{project.projectName}</Link>
                                    <p className="text-sm text-gray-400">
                                        Cliente: {project.clientName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                            <Menu.Item>
                                                <Link to={`projects/${project._id}`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    Ver Proyecto
                                                </Link>
                                            </Menu.Item>
                                            {isAuthorization(project.manager) && (
                                                <>
                                                    <Menu.Item>
                                                        <Link to={`/projects/${project._id}/edit`}
                                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                            Editar Proyecto
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <button
                                                            type='button'
                                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                            onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                                        >
                                                            Eliminar Proyecto
                                                        </button>
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className=" font-bold py-10 text-center">No hay proyectos aún, {''}
                    <Link
                        to={'/projects/create'}
                        className="text-purple-600 cursor-pointer"
                    >Crear Proyecto</Link>
                </p>
            )}

            <DeleteProjectModal />
        </>
    )
}

export default DashboardPage