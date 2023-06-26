import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

import { Product } from "../../types";

type Props = {
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  selectedProduct: Product | null;
  handleDeleteProduct: (id: number) => void;
};

const DeleteProductModal = ({
  showDeleteModal,
  setShowDeleteModal,
  selectedProduct,
  handleDeleteProduct,
}: Props) => {
  return (
    <Modal
      title="Delete Product"
      open={showDeleteModal}
      onCancel={() => setShowDeleteModal(false)}
      footer={null}
      className="delete_product_modal"
    >
      <p>Are you sure you want to delete this product?</p>

      <div className="flex items-center justify-end space-x-4">
        <button
          className="rounded-lg bg-[#111827] px-4 py-2 text-white"
          onClick={() => handleDeleteProduct(selectedProduct?.id as number)}
        >
          Yes
        </button>
        <button
          className="rounded-lg bg-[#E5E7EB] px-4 py-2 text-[#111827]"
          onClick={() => setShowDeleteModal(false)}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
