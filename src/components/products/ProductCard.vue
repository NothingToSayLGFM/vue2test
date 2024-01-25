<template>
  <router-link
    :to="{ name: 'singleproduct', params: { id: product.id } }"
    class="card"
  >
    <div class="image">
      <img :src="product.img" alt="image" />
    </div>
    <div class="detail">
      <p>height: {{ product.height }}</p>
      <p>widht: {{ product.width }}</p>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid beige;
  gap: 5px;
  .image {
    img {
      max-width: 200px;
      max-height: 200px;
    }
  }
}
</style>
