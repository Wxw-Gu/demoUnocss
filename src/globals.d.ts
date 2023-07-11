declare module '*.scss';

interface PublishItem {
  key: string
  product_line_id: string
  project_id: string
  deploy_env_id: string
  project_module_id: string
  project_deploy_name: string
  manager: string
  last_version: string
  next_version: string
  deploy_status: string
}