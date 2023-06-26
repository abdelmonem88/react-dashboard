/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Product, UpdatedProduct, CreatedProduct } from "../../types";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../api/products";
import useDebounce from "../../hooks/UseDebounce";
import DataTable from "../../components/global/DataTable";
import DeleteProductModal from "../../components/products/DeleteProductModal";
import EditProductModal from "../../components/products/EditProductModal";
import CreateProductModal from "../../components/products/CreateProductModal";
import PageTitle from "../../components/global/PageTitle";
import ItemsOperations from "../../components/global/ItemsOperations";
import SearchInput from "../../components/global/SearchInput";
import AddItemBtn from "../../components/global/AddItemBtn";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span>{text}</span>,
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
      width: "35%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: number) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text: number) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: any) => (
        <Space size="middle">
          <button
            className="
            w-20
            rounded-md
            bg-[#10B981]
            px-4
            py-2
            text-white
            transition
            duration-200
            ease-in-out
            hover:bg-[#047857]
            focus:outline-none
            focus:ring-2
            focus:ring-[#047857]
            focus:ring-opacity-50
            "
            onClick={() => {
              setSelectedProduct(record);
              setShowEditModal(true);
            }}
          >
            Edit
          </button>
          <button
            className="w-20
            rounded-md
            bg-[#EF4444]
            px-4
            py-2
            text-white
            transition
            duration-200
            ease-in-out
            hover:bg-[#B91C1C]
            focus:outline-none
            focus:ring-2
            focus:ring-[#B91C1C]
            focus:ring-opacity-50
            "
            onClick={() => {
              setSelectedProduct(record);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const [tableParams, setTableParams] = useState<{
    pagination: TablePaginationConfig;
  }>({
    pagination: {
      current: 1,
      total: 0,
    },
  });

  const debouncedSearchTerm = useDebounce(search, 500);

  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery<
    {
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    },
    Error
  >(
    "query-products",
    () => {
      if (debouncedSearchTerm) {
        return getProducts(
          debouncedSearchTerm,
          tableParams.pagination.current as number
        );
      }
      return getProducts("", tableParams.pagination.current as number);
    },
    {
      onSuccess: (data) => {
        setProducts(data.products);
        setTableParams({
          pagination: {
            ...tableParams.pagination,
            total: data.total,
          },
        });
      },
    }
  );

  const { isLoading: isCreating, mutate: createMutate } = useMutation(
    (product: CreatedProduct) => createProduct(product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-products");
      },
    }
  );

  const { isLoading: isDeleting, mutate: deleteMutate } = useMutation(
    (id: number) => deleteProduct(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-products");
      },
    }
  );

  const { isLoading: isUpdating, mutate: updateMutate } = useMutation(
    (product: UpdatedProduct) =>
      updateProduct(selectedProduct?.id as number, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-products");
      },
    }
  );

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteMutate(id);
      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateProduct = async (id: number, product: UpdatedProduct) => {
    try {
      await updateMutate(product);
      setShowEditModal(false);
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCreateProduct = async (product: CreatedProduct) => {
    try {
      await createMutate(product);
      setShowCreateModal(false);
      toast.success("Product created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    } else {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams.pagination.current]);

  useEffect(() => {
    if (isLoading || isCreating || isDeleting || isUpdating) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, isCreating, isDeleting, isUpdating]);

  return (
    <>
      <PageTitle title="Products" />

      <ItemsOperations>
        <SearchInput search={search} setSearch={setSearch} />
        <AddItemBtn
          btnText="Add Product"
          actionFn={() => setShowCreateModal(true)}
        />
      </ItemsOperations>

      <DataTable
        columns={columns}
        items={products}
        tableParams={tableParams}
        setTableParams={setTableParams}
        loading={loading}
      />

      <DeleteProductModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedProduct={selectedProduct}
        handleDeleteProduct={handleDeleteProduct}
      />

      <EditProductModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedProduct={selectedProduct}
        handleUpdateProduct={handleUpdateProduct}
      />

      <CreateProductModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        handleCreateProduct={handleCreateProduct}
      />
    </>
  );
};

export default Products;
