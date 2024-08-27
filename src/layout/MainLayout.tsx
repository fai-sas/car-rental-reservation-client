import { Button, Layout } from 'antd'
// import Sidebar from './Sidebar'

import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/features/auth/authSlice'
import Sidebar from './Sidebar'
const { Header, Content } = Layout

const MainLayout = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Header className='flex items-center justify-between gap-4 overflow-hidden'>
          <NavLink to='/'>
            <Button>Back Home</Button>
          </NavLink>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
