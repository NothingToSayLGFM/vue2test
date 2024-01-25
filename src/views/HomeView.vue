<template>
  <main class="main">
    <aside class="aside">
      <div class="aside-inner" v-if="initialCategories.length">
        <div
          class="input-wrap"
          v-for="category in initialCategories"
          :key="category"
        >
          <input
            type="checkbox"
            :id="category"
            :value="category"
            v-model="checkedCategories"
          />
          <label :for="category">{{ category }}</label>
        </div>
        <button @click="applyFilters" class="aside-button">apply</button>
      </div>
      <div v-else-if="isCategoriesLoading">
        <DefaultLoader />
      </div>
      <div v-else-if="isCategoriesError">
        <p style="color: red">something went wrong</p>
      </div>
      <div v-else>
        <p>there is no category for now</p>
      </div>
    </aside>
    <section>
      <div class="list" v-if="initialProducts.length">
        <div class="list-wrap">
          <ProductCard
            v-for="product in initialProducts"
            :product="product"
            :key="product.id"
          />
        </div>
      </div>
      <div v-else-if="isDataLoading">
        <DefaultLoader />
      </div>
      <div v-else-if="isDataError">
        <p style="color: red">something went wrong</p>
      </div>
      <div v-else>
        <p>Nothing found</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";

import { getProducts } from "../api/products.js";
import { getCategories } from "../api/categories.js";

import DefaultLoader from "../components/Loaders/DefaultLoader.vue";
import ProductCard from "../components/products/ProductCard.vue";

const initialProducts = ref([]);
const isDataLoading = ref(false);
const isDataError = ref(false);

const initialCategories = ref([]);
const isCategoriesLoading = ref(false);
const isCategoriesError = ref(false);

const checkedCategories = ref([]);

// in vue version less then 3 is no useRoute/useRouter hooks
const route = getCurrentInstance().proxy.$route;
const router = getCurrentInstance().proxy.$router;

const applyFilters = async () => {
  if (checkedCategories.value.length) {
    router.push({
      query: {
        categories:
          checkedCategories.value.length > 1
            ? checkedCategories.value.join(",")
            : checkedCategories.value.join(),
      },
    });
  } else {
    router.push({ query: {} });
  }
  await getProductsData(checkedCategories.value);
};

const getCategoriesData = async () => {
  try {
    isCategoriesLoading.value = true;
    isCategoriesError.value = false;
    const data = await getCategories();
    initialCategories.value = data;
  } catch {
    isCategoriesError.value = true;
  } finally {
    isCategoriesLoading.value = false;
  }
};

const getProductsData = async (categories = []) => {
  try {
    isDataLoading.value = true;
    isDataError.value = false;
    const data = await getProducts(categories);
    initialProducts.value = data;
  } catch (e) {
    console.log(e);
    isDataError.value = true;
  } finally {
    isDataLoading.value = false;
  }
};

onMounted(async () => {
  await getProductsData(
    route.query.categories ? route.query?.categories.split(",") : []
  );
  await getCategoriesData();
  checkedCategories.value = route.query.categories
    ? route.query?.categories.split(",")
    : [];
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 20px;
  padding: 40px 40px 0 40px;
}
.aside {
  background-color: beige;
  .aside-inner {
    padding: 15px 15px 0 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .input-wrap {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }
}
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
