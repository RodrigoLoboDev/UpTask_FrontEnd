import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from './pages/projects/CreateProjectPage'
import EditProjectPage from './pages/projects/EditProjectPage'
import ProjectDetailsVIew from './pages/projects/ProjectDetailsVIew'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import RequestNewCodePage from './pages/auth/RequestNewCodePage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import NewPasswordPage from './pages/auth/NewPasswordPage'
import ProjectTeamPage from './pages/projects/ProjectTeamPage'
import ProfilePage from './pages/profile/ProfilePage'
import ChangePasswordPage from './pages/profile/ChangePasswordPage'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './pages/404/NotFound'

// Creamos nuestro router y las rutas
const RouterApp = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}> 
                <Route index element={<DashboardPage />} /> 
                <Route path='/projects/create' element={<CreateProjectPage />} /> 
                <Route path='/projects/:projectID' element={<ProjectDetailsVIew />} />
                <Route path='/projects/:projectID/edit' element={<EditProjectPage />} />
                <Route path='/projects/:projectID/team' element={<ProjectTeamPage />} />

                <Route element={<ProfileLayout />}>
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/profile/password' element={<ChangePasswordPage />} />
                </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path='/auth/login' element={<LoginPage />} />
              <Route path='/auth/register' element={<RegisterPage />} />
              <Route path='/auth/confirm-account' element={<ConfirmAccountPage />} />
              <Route path='/auth/new-code' element={<RequestNewCodePage />} />
              <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/auth/new-password' element={<NewPasswordPage />} />
            </Route>

            <Route element={<AuthLayout/>}>
              <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default RouterApp