<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BridgeInfoCard"
}
</script>

<style scoped>
.card {
  margin: 0;
  width: 90%;
  height: 90%;
  display: flex;
  background-color: #F6F4ED;
  box-shadow: 10px 10px 5px #888888;
  padding: 10px;
  border-radius: 5px;
}
</style>