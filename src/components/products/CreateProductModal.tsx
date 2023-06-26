import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Dispatch, SetStateAction } from "react";

import { CreatedProduct } from "../../types";

type Props = {
  showCreateModal: boolean;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  handleCreateProduct: (createdProduct: CreatedProduct) => void;
};

const CreateProductModal = ({
  showCreateModal,
  setShowCreateModal,
  handleCreateProduct,
}: Props) => {
  const [form] = useForm();

  return (
    <Modal
      title="Create Product"
      open={showCreateModal}
      onCancel={() => {
        setShowCreateModal(false);
        form.resetFields();
      }}
      footer={null}
      className="create_product_modal"
    >
      <Form
        form={form}
        name="create_product_form"
        initialValues={{
          title: "",
          price: "",
          stock: "",
        }}
        onFinish={(values) => {
          const { title, price, stock } = values;
          const createdProduct = {
            title: title as string,
            price: Number(price).toFixed(2) as unknown as number,
            stock: Number(stock).toFixed() as unknown as number,
          };
          handleCreateProduct(createdProduct);
          form.resetFields();
        }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input product title!" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input placeholder="Product Price" />
        </Form.Item>
        <Form.Item
          name="stock"
          rules={[{ required: true, message: "Please input product stock!" }]}
        >
          <Input placeholder="Product Stock" />
        </Form.Item>
        <Form.Item
          style={{
            marginTop: "2rem",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#111827",
              borderColor: "#111827",
              borderRadius: "0.375rem",
            }}
          >
            Create Product
          </Button>
          <Button
            type="default"
            style={{
              backgroundColor: "#E5E7EB",
              borderColor: "#E5E7EB",
              borderRadius: "0.375rem",
              marginLeft: "1rem",
            }}
            onClick={() => {
              setShowCreateModal(false);
            }}
          >
            <span>Cancel</span>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
