import { Button, Layout } from 'antd'
// import Sidebar from './Sidebar'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/features/auth/authSlice'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react'
const { Header, Content } = Layout

const MainLayout = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return (
      savedTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    )
  })

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout className='dark:bg-gray-900'>
        <Header className='flex items-center justify-between gap-4 overflow-hidden'>
          <NavLink to='/'>
            <Button>Back Home</Button>
          </NavLink>
          <Button onClick={handleLogout}>Logout</Button>
          {/* Theme Switcher */}
          <button
            type='button'
            onClick={handleThemeSwitch}
            className='flex items-center px-4 py-2 text-white rounded dark:bg-gray-900 '
          >
            {theme === 'dark' ? (
              <FaSun className='text-yellow-400' size={20} />
            ) : (
              <FaMoon className='text-gray-300' size={20} />
            )}
            <span className='ml-2'>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </Header>
        <Content className='dark:bg-gray-900' style={{ margin: '24px 16px 0' }}>
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
