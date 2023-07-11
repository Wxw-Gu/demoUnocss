import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import { router } from './routes/router'
import 'virtual:uno.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
       <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>,
)
