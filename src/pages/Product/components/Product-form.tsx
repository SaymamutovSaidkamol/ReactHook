import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import useGetCategoryType from '../service/quer/useGetType';
import useCreateCateg from '../service/mutation/useCreateProd';
import { useEffect } from 'react';
import usePatchCateg from '../service/mutation/usePatchProd';
import { useQueryClient } from '@tanstack/react-query';
import useGetColorType from '../service/quer/useGetColorType';

type FieldType = {
    name: string;
    price: number;
    img: string;
    description: string;
    count: number;
    skidka: number;
    categoryId: string;
    colorIds: string[];
    createdAt: string
};

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
    key?: string
}

interface Props {
    closeModal: () => void
    defaultValue?: dataSourse
}

const CategoryForm = ({ closeModal, defaultValue }: Props) => {
    const { data } = useGetCategoryType()
    const { data: DataColor } = useGetColorType()
    console.log(DataColor, "Type");

    const { mutate } = useCreateCateg()
    const { mutate: updateCateg } = usePatchCateg()
    const [form] = Form.useForm()
    const client = useQueryClient()


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if (defaultValue) {
            return (
                updateCateg({ id: defaultValue.key, name: values.name }, {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: ['products'] })
                        closeModal()
                    }
                })
            )
        }

        console.log(values);
        mutate({
            name: values.name,
            price: Number(values.price),
            img: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            description: values.description,
            count: Number(values.count),
            skidka: Number(values.skidka),
            categoryId: values.categoryId,
            colorIds: values.colorIds,
            createdAt: values.createdAt

        }, {
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['products'] })
                closeModal()
            },

            onError: (err: any) => {
                form.setFields([{
                    name: "name", errors: [err?.response?.data?.message]
                }])
                console.log();
            }
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const typeList = data?.data?.map((item: any) => ({ value: item.id, label: <span>{item.name}</span> }))
    useEffect(() => {
        return () => {
            console.log('render');
        }
    }, [])

    const typeColorList = DataColor?.data?.map((item: any) => ({ value: item.id, label: <span>{item.name}</span> }))
    useEffect(() => {
        return () => {
            console.log('render');
        }
    }, [])


    useEffect(() => {

        form.setFields([
            {
                name: "name",
                value: defaultValue?.name
            },
            {
                name: "price",
                value: defaultValue?.price
            },
            {
                name: "img",
                value: defaultValue?.img
            },
            {
                name: "description",
                value: defaultValue?.description
            },
            {
                name: "count",
                value: defaultValue?.count
            },
            {
                name: "skidka",
                value: defaultValue?.skidka
            },
            {
                name: "categoryId",
                value: defaultValue?.categoryId
            },
            {
                name: "colorIds",
                value: defaultValue?.colorIds
            },
        ])

    }, [defaultValue])

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className=' container mx-auto flex items-center justify-center'>
                    <div className='w-[400px]   '>
                        <h1 className='py-5 flex justify-center font-bold text-4xl'>{defaultValue? "Changet": "Create"} Product</h1>
                        <Form
                            form={form}
                            name="basic"
                            layout='vertical'
                            initialValues={{
                                name: defaultValue?.name,
                                price: defaultValue?.price,
                                img: defaultValue?.img,
                                description: defaultValue?.name,
                                count: defaultValue?.count,
                                skidka: defaultValue?.skidka,
                                categoryId: defaultValue?.categoryId,
                                colorIds: defaultValue?.colorIds
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}

                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Count"
                                name="count"
                                rules={[{ required: true, message: 'Please input your count!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Skidka"
                                name="skidka"
                                rules={[{ required: true, message: 'Please input your skidka!' }]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="CategoryId"
                                name="categoryId"
                                rules={[{ required: true, message: 'Please input your categoryId!' }]}
                            >
                                <Select disabled={defaultValue ? true : false} placeholder="Type" options={typeList} />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Color"
                                name="colorIds"
                                rules={[{ required: true, message: 'Please input your Color!' }]}
                            >
                                <Select
                                    mode="multiple" // <-- Bu kerak
                                    allowClear
                                    disabled={defaultValue ? true : false}
                                    placeholder="Color"
                                    options={typeColorList}
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button loading={false} type="primary" htmlType="submit" className='w-[100%]'>
                                    {defaultValue ? "Changet": "Create"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm
