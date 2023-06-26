import axiosInstance from "../utility/axios";

import { UpdatedProduct, CreatedProduct } from "../types";

const getProducts = async (search: string, page: number = 1) => {
  let skip = (page - 1) * 10;
  try {
    const response = await axiosInstance.get(
      `products/search?q=${search}&skip=${skip}&limit=10`
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const createProduct = async (product: CreatedProduct) => {
  try {
    const response = await axiosInstance.post("products/add", product);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const updateProduct = async (productId: number, product: UpdatedProduct) => {
  try {
    const response = await axiosInstance.put(`products/${productId}`, product);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const deleteProduct = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
