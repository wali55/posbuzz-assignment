import { useState } from 'react';
import { Typography, Table, Button, message } from 'antd';
import { 
  PlusOutlined, 
  EyeOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

export default function Sales() {
  const [sales] = useState([
    {
      key: '1',
      createdBy: 'John Smith',
      totalPrice: 1599.98,
      createdAt: '2026-01-28 10:30:00',
    },
    {
      key: '2',
      createdBy: 'Sarah Johnson',
      totalPrice: 299.99,
      createdAt: '2026-01-28 09:15:00',
    },
    {
      key: '3',
      createdBy: 'Mike Davis',
      totalPrice: 89.99,
      createdAt: '2026-01-27 16:45:00',
    },
    {
      key: '4',
      createdBy: 'Emily Wilson',
      totalPrice: 1899.95,
      createdAt: '2026-01-27 14:20:00',
    },
    {
      key: '5',
      createdBy: 'John Smith',
      totalPrice: 449.99,
      createdAt: '2026-01-27 11:30:00',
    },
    {
      key: '6',
      createdBy: 'David Brown',
      totalPrice: 159.99,
      createdAt: '2026-01-26 15:10:00',
    },
    {
      key: '7',
      createdBy: 'Sarah Johnson',
      totalPrice: 2499.98,
      createdAt: '2026-01-26 13:45:00',
    },
    {
      key: '8',
      createdBy: 'Lisa Anderson',
      totalPrice: 679.99,
      createdAt: '2026-01-26 10:20:00',
    },
    {
      key: '9',
      createdBy: 'Mike Davis',
      totalPrice: 129.99,
      createdAt: '2026-01-25 17:30:00',
    },
    {
      key: '10',
      createdBy: 'Emily Wilson',
      totalPrice: 3299.97,
      createdAt: '2026-01-25 14:15:00',
    },
  ]);

  const handleView = (record: any) => {
    console.log('View sale:', record);
    message.info(`Viewing sale #${record.key}`);
    // Add view logic here
  };

  const handleCreateSale = () => {
    console.log('Create new sale');
    message.info('Opening create sale form');
    // Add create sale logic here
  };

  const columns = [
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      //@ts-ignore
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
      render: (name: string) => (
        <span style={{ fontWeight: 500 }}>{name}</span>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      //@ts-ignore
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (price: number) => (
        <span style={{ 
          color: '#1890ff', 
          fontWeight: 600,
          fontSize: '15px'
        }}>
          ${price.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // @ts-ignore
      sorter: (a: string, b: string) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: 'descend',
      render: (date:string) => {
        const dateObj = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let displayDate;
        if (dateObj.toDateString() === today.toDateString()) {
          displayDate = 'Today';
        } else if (dateObj.toDateString() === yesterday.toDateString()) {
          displayDate = 'Yesterday';
        } else {
          displayDate = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
        }
        
        const time = dateObj.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        return (
          <div>
            <div style={{ fontWeight: 500 }}>{displayDate}</div>
            <div style={{ color: '#8c8c8c', fontSize: '13px' }}>{time}</div>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
          title="View"
        />
      ),
    },
  ];

  
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>All Sales</Title>
          <p style={{ 
            color: '#8c8c8c', 
            margin: '8px 0 0 0',
            fontSize: '14px'
          }}>
            Total Revenue: <span style={{ 
              color: '#52c41a', 
              fontWeight: 600,
              fontSize: '16px'
            }}>
              ${totalSales.toFixed(2)}
            </span>
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateSale}
          size="large"
        >
          Create Sale
        </Button>
      </div>

      <Table 
      // @ts-ignore
        columns={columns} 
        dataSource={sales} 
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} sales`,
        }}
        scroll={{ x: 600 }}
        bordered
      />
    </div>
  );
}