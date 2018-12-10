<template>
  <span class="filter-item">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'QueryItem'
}
</script>

<style scoped lang="scss">
.filter-item {
  display: inline-block;
  vertical-align: middle;
  & + & {
    margin-left: 10px;
  }
}

</style>
