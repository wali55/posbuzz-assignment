import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import axios from 'axios';

export default function CreateProductModal({ open, onClose }: {open: boolean, onClose: () => void}) {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: (productData) => axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries(["products"]);
      message.success('Product created successfully!');
      onClose();
    }
  })

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      mutate(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Create New Product"
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="createProduct"
        style={{ marginTop: '24px' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input product name!'
            },
            {
              min: 3,
              message: 'Product name must be at least 3 characters!'
            }
          ]}
        >
          <Input 
            placeholder="Enter product name" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="sku"
          label="SKU"
          rules={[
            {
              required: true,
              message: 'Please input SKU!'
            },
            {
              pattern: /^[A-Z0-9-]+$/,
              message: 'SKU should only contain uppercase letters, numbers, and hyphens!'
            }
          ]}
        >
          <Input 
            placeholder="e.g., LP-2024-001" 
            size="large"
            style={{ textTransform: 'uppercase' }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please input price!'
            },
            {
              type: 'number',
              min: 0.01,
              message: 'Price must be greater than 0!'
            }
          ]}
        >
          <InputNumber
            placeholder="0.00"
            prefix="৳"
            size="large"
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="stock_quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: 'Please input quantity!'
            },
            {
              type: 'number',
              min: 0,
              message: 'Quantity cannot be negative!'
            }
          ]}
        >
          <InputNumber
            placeholder="0"
            size="large"
            style={{ width: '100%' }}
            min={0}
            step={1}
            precision={0}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleCancel}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              onClick={handleCreate}
              size="large"
              loading={isPending}
            >
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}