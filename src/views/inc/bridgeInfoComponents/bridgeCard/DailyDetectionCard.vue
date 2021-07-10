<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DailyDetectionCard"
}
</script>

<style scoped>
.card {
  margin: 0;
  width: 98%;
  height: 90%;
  border: 1px solid #888888;
  background-color: #E5F7F9;
  box-shadow: 10px 10px 5px #888888;
  padding: 10px;
  border-radius: 5px;
}
</style>