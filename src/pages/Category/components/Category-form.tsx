import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import useGetCategoryType from '../service/quer/useGetType';
import useCreateCateg from '../service/mutation/useCreateCateg';
import { useEffect } from 'react';
import usePatchCateg from '../service/mutation/usePatchCateg';
import { useQueryClient } from '@tanstack/react-query';

type FieldType = {
    name: string;
    type: string;
};

interface dataSourse {
    name?: string
    dataIndex?: string
    type?: string
    key?: string
}

interface Props {
    closeModal: () => void
    defaultValue?: dataSourse
}

const CategoryForm = ({ closeModal, defaultValue }: Props) => {
    const { data } = useGetCategoryType()
    const { mutate } = useCreateCateg()
    const { mutate: updateCateg } = usePatchCateg()
    const [form] = Form.useForm()
    const client = useQueryClient()


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if (defaultValue) {
            return (
                updateCateg({ id: defaultValue.key, name: values.name }, {
                    onSuccess: () => {
                        client.invalidateQueries({ queryKey: ['category'] })
                        closeModal()
                    }
                })
            )
        }

        console.log(values);
        mutate({ name: values.name, typeId: values.type }, {
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['category'] })
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
    const typeList = data?.map((item: any) => ({ value: item.id, label: <span>{item.name}</span> }))
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
                name: "type",
                value: defaultValue?.type
            },
        ])

    }, [defaultValue])

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className=' container mx-auto flex items-center justify-center'>
                    <div className='w-[400px]   '>
                        <h1 className='py-5 flex justify-center font-bold text-4xl'>Create Category</h1>
                        <Form
                            form={form}
                            name="basic"
                            layout='vertical'
                            initialValues={{
                                type: defaultValue?.type,
                                name: defaultValue?.name
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
                                label="type"
                                name="type"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <Select disabled={defaultValue ? true : false} placeholder="Type" options={typeList} />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button loading={false} type="primary" htmlType="submit" className='w-[100%]'>
                                    Submit
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
