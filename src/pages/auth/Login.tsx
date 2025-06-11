import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useLogin } from './service/useLogin';
import { saveState } from '../../config/storage';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  email: string;
  password: string;
};



const Login: React.FC = () => {

  const navigate = useNavigate()
  const { isPending, mutate } = useLogin()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values, {
      onSuccess: (res: { token: string }) => {
        console.log(res);
        saveState('token', res.token)
        navigate('/app', {
          replace: true
        })
      }
    })
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>

      <div className='h-[100vh] flex items-center justify-center login__wrapper'>
        <div className=' container mx-auto flex items-center justify-center'>
          <div className='w-[400px]   '>
            <h1 className='py-5 flex justify-center font-bold text-4xl'>Login</h1>
            <Form
              name="basic"
              layout='vertical'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Button loading={isPending} type="primary" htmlType="submit" className='w-[100%]'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;