<template>
  <div class="text-center">analytics</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setPageTitle", "Analytics");
  },
};
</script>

<style scoped></style>
