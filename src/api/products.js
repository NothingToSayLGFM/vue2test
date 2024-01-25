import api from "./config.js";

export const getProducts = async (categories = []) => {
  const url =
    categories.length !== 0
      ? `/products?categories=${categories.join(",")}`
      : "/products";

  const { data } = await api.get(url);

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
