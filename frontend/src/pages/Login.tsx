import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const { Title } = Typography;

export type Login = {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {mutate, isPending} = useMutation({
    mutationFn: (loginCredential) => axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginCredential),
    onSuccess: (data: {data: {access_token: string}}) => {
      localStorage.setItem("token", data.data.access_token);
      message.success('Login successful!');
      navigate("/");
    }
  })

  const onFinish = (values: Login) => {
    console.log("Login credentials:", values);
    //@ts-ignore
    mutate(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #71717a 0%, #09090b 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={2} style={{ marginBottom: "8px" }}>
            Welcome Back
          </Title>
          <p style={{ color: "#8c8c8c", margin: 0 }}>
            Please login to your account
          </p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isPending}
              style={{
                height: "45px",
                fontSize: "16px",
                fontWeight: "500",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span style={{ color: "#8c8c8c" }}>Don't have an account? </span>
            <Link to="/register" style={{ color: "#667eea", fontWeight: "500" }}>
              Register
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
