import useGetCategory from './service/quer/useGetCategory'
import { Button, Modal, Table, type TableProps } from 'antd';
import useToggle from '../../hooks/useToggle';
import CategoryForm from './components/Category-form';
import { useState } from 'react';
import useDeleteCateg from './service/mutation/useDeleteCateg';
import { useQueryClient } from '@tanstack/react-query';

interface dataSourse {
  name?: string
  dataIndex?: string
  type?: string
  key?: string
}

const Category = () => {
  const { close, open, isopen } = useToggle()
  const { close: close2, open: open2, isopen: isopen2 } = useToggle()
  const [initialData, setInitialData] = useState<dataSourse | undefined>()
  const client = useQueryClient()

  const { data } = useGetCategory()
  const { mutate } = useDeleteCateg()

  const handleDetele = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['category'] })
      }
    })
  }

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
      render: (data: dataSourse) => {
        return <div className='flex gap-2'>
          <Button onClick={() => handleDetele(data?.key as string)}>Delete</Button>
          <Button onClick={() => editContent(data)}>Edit</Button>
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

  const editContent = (data: dataSourse) => {
    open2()
    setInitialData(data);
    console.log(data, "Sdsa");

  }


  return (
    <div>
      <Button onClick={open} type='primary'>Create</Button>
      <Modal footer={false} onCancel={close} open={isopen}>
        <CategoryForm closeModal={close} />
      </Modal>
      <Modal footer={false} onCancel={close2} open={isopen2}>
        <CategoryForm closeModal={close2} defaultValue={initialData} />
      </Modal>
      <Table<dataSourse> dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Category
