import axios from "axios";
import ProductsList from "../components/product/ProductsList";
import { useQuery } from "@tanstack/react-query";
import { Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useState } from "react";
import CreateProductModal from "../components/product/CreateProductModal";
import EditProductModal from "../components/product/EditProductModal";
import DeleteProductModal from "../components/product/DeleteProductModal";

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number | string;
  stock_quantity: number | string;
};

export default function Products() {
  const [createProductModal, setCreateProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { Title } = Typography;
  const token = localStorage.getItem("token");
  const getProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleClose = () => {
    setCreateProductModal(false);
  }

  const handleEditClose = () => {
    setEditProductModal(false);
    setSelectedProduct(null);
  }

  const handleDeleteClose = () => {
    setDeleteProductModal(false);
    setSelectedProduct(null);
  }

  const handleSelect = (product: Product) => {
    //@ts-ignore
    setSelectedProduct(product);
    setEditProductModal(true);
  }

  const handleSelectDelete = (product: Product) => {
    //@ts-ignore
    setSelectedProduct(product);
    setDeleteProductModal(true);
  }

  if (isLoading) return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}><Spin /></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          All Products
        </Title>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setCreateProductModal(true)}>
          Create Product
        </Button>
      </div>
      {products.data.length ? (
        //@ts-ignore
        <ProductsList products={products.data} onSelect={handleSelect}  onSelectDelete={handleSelectDelete} />
      ) : (
        <p>No products Available</p>
      )}

      <CreateProductModal open={createProductModal} onClose={handleClose} />
      {/* @ts-ignore */}
      {selectedProduct && <EditProductModal product={selectedProduct} open={editProductModal} onClose={handleEditClose} />}

      {selectedProduct && <DeleteProductModal product={selectedProduct} open={deleteProductModal} onClose={handleDeleteClose} />}
    </div>
  );
}
