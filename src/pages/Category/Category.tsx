import useGetCategory from './service/quer/useGetCategory'
import { Button, Modal, Table, type TableProps } from 'antd';
import useToggle from '../../hooks\'/useToggle';
import CategoryForm from './components/Category-form';

interface dataSourse {
  title?: string
  dataIndex?: string
  key?: string
}

const Category = () => {

  const { data } = useGetCategory()

  const columns: TableProps<dataSourse>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      render: () => {
        return <div className='flex gap-2'>
          <Button>Delete</Button>
          <Button>Edit</Button>
        </div>
      }
    },
  ];

  const dataSource = data?.data.map((item) => ({
    createdAt: item.createdAt.slice(0, 10),
    name: item.name,
    type: item.type.name,
    key: item.id
  }));

  const { close, open, isopen } = useToggle()

  return (
    <div>
      <Button onClick={open} type='primary'>Create</Button>
      <Modal footer={false} onCancel={close} open={isopen}>
        <CategoryForm closeModal={close}/>
      </Modal>
      <Table<dataSourse> dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Category
