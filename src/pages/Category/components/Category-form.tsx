import type { FormProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import useGetCategoryType from '../service/quer/useGetType';
import useCreateCateg from '../service/mutation/useCreateCateg';

type FieldType = {
    name: string;
    type: string;
};

interface Props {
    closeModal: () => void
}

const CategoryForm = ({ closeModal }: Props) => {
    const { data } = useGetCategoryType()
    const { mutate } = useCreateCateg()


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log(values);
        mutate({ name: values.name, typeId: values.type }, {
            onSuccess: (res) => {
                console.log(res);
                closeModal()
            }
        })

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const typeList = data?.map((item: any) => ({ value: item.id, label: <span>{item.name}</span> }))
    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className=' container mx-auto flex items-center justify-center'>
                    <div className='w-[400px]   '>
                        <h1 className='py-5 flex justify-center font-bold text-4xl'>Create Category</h1>
                        <Form
                            name="basic"
                            layout='vertical'
                            initialValues={{ remember: true }}
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
                                <Select placeholder="Type" options={typeList} />
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
