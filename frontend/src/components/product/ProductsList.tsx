import { Table, Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Product } from "../../pages/Products";

const ProductsList = ({
  products,
  onSelect,
  onSelectDelete,
}: {
  products: Product[];
  onSelect: () => void;
  onSelectDelete: () => void;
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `৳${Number(price).toFixed(2)}`,
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock_quantity",
      key: "stock",
      render: (stock_quantity: number) => (
        <span
          style={{
            color:
              stock_quantity === 0
                ? "#ff4d4f"
                : stock_quantity < 30
                  ? "#faad14"
                  : "#52c41a",
          }}
        >
          {stock_quantity}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} title="View" />
          <Button
            type="text"
            icon={<EditOutlined />}
            title="Edit"
            // @ts-ignore
            onClick={() => onSelect(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            title="Delete"
            // @ts-ignore
            onClick={() => onSelectDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={products}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
};

export default ProductsList;
