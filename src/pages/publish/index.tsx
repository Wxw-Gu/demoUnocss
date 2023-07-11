import { Form, Input, Popconfirm, Select, Table, Typography } from 'antd'
import type { SetStateAction } from 'react'
import { useEffect, useState } from 'react'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: PublishItem
  index: number
  children: React.ReactNode
}
const statusMap = {
  running: '发布中',
  ready: '待上线',
  online: '已上线',
  not_online: '不发版',
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let dom
  switch (dataIndex) {
    case 'deploy_status':
      dom = <Select >
    <Select.Option value="running">发布中</Select.Option>
     <Select.Option value="ready">待上线</Select.Option>
     <Select.Option value="online">已上线</Select.Option>
     <Select.Option value="not_online">不发版</Select.Option>
   </Select>
      break
    case 'next_version':
      dom = <Input />
      break
    default:
      dom = children
      break
  }
  return (
    <td {...restProps}>
      {editing
        ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {dom}
        </Form.Item>
          )
        : (
            dataIndex === 'deploy_status' ? statusMap[record[dataIndex] as keyof typeof statusMap] : children
          )}
    </td>
  )
}

export const Publish: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<PublishItem[]>([])
  const [editingKey, setEditingKey] = useState('')
  const env = window.location.href.split('env=')[window.location.href.split('env=').length - 1]

  const isEditing = (record: { key: string }) => record.key === editingKey

  const edit = (record: { key: SetStateAction<string> }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async () => {
    try {
      const data = ({
        ...await form.validateFields(),
        deploy_env_id: env,
      })
      await PublishService.update_version(data)
      init()
      setEditingKey('')
    }
    catch (errInfo) {
      console.error(errInfo, 'errInfo')
    }
  }

  const columns = [
    {
      title: '操作',
      dataIndex: '操作',
      render: (_: any, record: { key: any }) => {
        const editable = isEditing(record)
        return editable
          ? (
            <span>
              <Typography.Link
                onClick={() => save()}
                style={{ marginRight: 8 }}
              >
                保存
              </Typography.Link>
              <Popconfirm title="确认取消？" onConfirm={cancel}>
                <a>取消</a>
              </Popconfirm>
            </span>
            )
          : (
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              修改
            </Typography.Link>
            )
      },
    },
  ]

  const mergedColumns = columns.filter((item: any) => item).map((col) => {
    if (col && col.editable) {
      return {
        ...col,
        onCell: (record: { key: string }) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      }
    }
    else { return col }
  })

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns as any}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  )
}
