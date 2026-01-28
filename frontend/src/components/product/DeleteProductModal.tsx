import { Button, message, Modal, Typography } from "antd";
import type { Product } from "../../pages/Products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const DeleteProductModal = ({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
}) => {
  const { Text } = Typography;
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API_URL}/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries(["products"]);
      message.success("Product deleted successfully!");
      onClose();
    },
  });

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    mutate();
  };

  return (
    <Modal
      open={open}
      title="Delete Product"
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose
    >
      <Text>Are your sure you want to delete {product.name}?</Text>
      <div>
      {isError && <Text type="danger">{error.message}</Text>}
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <Button onClick={handleCancel} size="large">
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleDelete}
          size="large"
          loading={isPending}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
