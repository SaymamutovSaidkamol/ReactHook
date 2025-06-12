import useGetCategory from './service/quer/useGetProd'
import { Button, Modal, Table, type TableProps } from 'antd';
import useToggle from '../../hooks/useToggle';
import CategoryForm from './components/Product-form';
import { useState } from 'react';
import useDeleteCateg from './service/mutation/useDeleteProd';
import { useQueryClient } from '@tanstack/react-query'

interface dataSourse {
  name?: string
  dataIndex?: string
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  colorIds: string[];
  key: string
}

const Product = () => {
  const { close, open, isopen } = useToggle()
  const { close: close2, open: open2, isopen: isopen2 } = useToggle()
  const [initialData, setInitialData] = useState<dataSourse | undefined>()
  const client = useQueryClient()

  const { data } = useGetCategory()

  const { mutate } = useDeleteCateg()

  const handleDetele = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['products'] })
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
      title: 'Price',
      dataIndex: `price`,
      key: 'price',
      render: (price) => `${price}$`
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Skidka',
      dataIndex: 'skidka',
      key: 'skidka',
    },
    {
      title: 'CategoryId',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'ColorIds',
      dataIndex: 'colorIds',
      key: 'colorIds',
      render: (colorIds: string[]) => colorIds.join(', ')
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
  // console.log("data", data);

  const dataSource = data?.map((item: any) => ({
    createdAt: item.createdAt?.slice(0, 10),
    name: item.name,
    price: parseInt(item.price),
    img: item.img,
    description: item.description || "Noma'lum",
    count: parseInt(item.count),
    skidka: parseInt(item.skidka) || 0,
    categoryId: item.category.name,
    colorIds: item.colors?.map((color: any) => color.name) || [],
    key: item.id
  }));


  const editContent = (data: dataSourse) => {
    open2()
    setInitialData(data);
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

export default Product
