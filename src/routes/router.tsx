import { createBrowserRouter } from 'react-router-dom'
import { Publish } from '@/pages/publish'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <div >错误页</div>,
    element: <Publish />,
  },
])
