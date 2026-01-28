import { Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const { Title } = Typography;

export type Register = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {mutate, isPending} = useMutation({
    mutationFn: (registerCredential) => axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, registerCredential),
    onSuccess: (data: {data: {access_token: string}}) => {
      localStorage.setItem("token", data.data.access_token);
      message.success('Registration successful!');
      navigate("/");
    }
  })

  const onFinish = (values: Register) => {
    //@ts-ignore
    mutate({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password
    })
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #71717a 0%, #09090b 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>Create Account</Title>
          <p style={{ color: '#8c8c8c', margin: 0 }}>Sign up to get started</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Row gutter={10}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!'
                  },
                  {
                    min: 2,
                    message: 'First name must be at least 2 characters!'
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="First name"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!'
                  },
                  {
                    min: 2,
                    message: 'Last name must be at least 2 characters!'
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="Last name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'Please enter a valid email!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              style={{
                height: '45px',
                fontSize: '16px',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                marginTop: '8px'
              }}
            >
              Create Account
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ color: '#8c8c8c' }}>Already have an account? </span>
            <Link to="/login" style={{ color: '#667eea', fontWeight: '500' }}>Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}