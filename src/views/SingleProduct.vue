<template>
  <main>
    <div class="wrap" v-if="product">
      <section class="image">
        <img :src="product.img" alt="image" />
      </section>
      <section class="detail">
        <p>height: {{ product.height }}</p>
        <p>width: {{ product.width }}</p>
        <p>id: {{ product.id }}</p>
      </section>
    </div>
    <div v-else-if="isLoading"></div>
    <div v-else-if="isError"><p>something went wrong</p></div>
    <div v-else>User not found</div>
  </main>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";

import { getProductById } from "../api/products.js";

const product = ref(null);
const isLoading = ref(false);
const isError = ref(false);

const route = getCurrentInstance().proxy.$route;

const getProductData = async () => {
  try {
    isError.value = false;
    isLoading.value = true;
    const data = await getProductById(route.params.id);
    product.value = data;
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getProductData();
});
</script>

<style lang="scss" scoped>
.image {
  img {
    max-width: 500px;
    max-height: 500px;
  }
}
.wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}
</style>
