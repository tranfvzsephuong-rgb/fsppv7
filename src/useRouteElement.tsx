import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AppContext } from './contexts/app.context'
import Admin from './pages/AdminIndex'
import AdminLayout from './Layouts/AdminLayout'
import HomeLayout from './Layouts/homeLayout'
import AdminUser from './pages/AdminUser'
import Meta from './pages/Meta'
import NotFound from './pages/NotFound'
import NotFounds from './pages/NotFounds'
import Success from './pages/Success'
import Main from './pages/Main'
const useRouteElements = () => {
  const { isAuthenticated } = React.useContext(AppContext)
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <HomeLayout>
          <Main />
           {/* <Home /> */}
        </HomeLayout>
      )
    },
    {
      path: '/meta',
      index: true,
      element: <Meta />
    },
    {
      path: '/success',
      element: <Success />
    },
    {
      path: '/dichvunhantien',
      index: true,
      element: (
        <HomeLayout>
          <Home />
        </HomeLayout>
      )
    },
    {
      path: '*',
      index: true,
      element: <NotFound />
    },
    {
      path: '/setting',
      index: true,
      element: <NotFounds />
    },
    !isAuthenticated
      ? {
          path: '/admin',
          element: <Login />
        }
      : {
          path: '/admin',
          element: <Navigate to='/admin' />
        },

    isAuthenticated
      ? {
          path: '/admin/index',
          element: (
            <AdminLayout>
              <Admin></Admin>
            </AdminLayout>
          )
        }
      : {
          path: '/admin/index',
          element: <Navigate to='/admin' />
        },
    isAuthenticated
      ? {
          path: '/admin/user',
          element: (
            <AdminLayout>
              <AdminUser></AdminUser>
            </AdminLayout>
          )
        }
      : {
          path: '/admin/index',
          element: <Navigate to='/admin' />
        }
  ])

  return routeElements
}
export default useRouteElements
