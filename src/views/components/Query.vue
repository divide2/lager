<template>
  <div class="filter-container">
    <slot name="query"></slot>
    <query-item>
      <el-button v-waves  type="primary" icon="el-icon-search" @click="onSearch">{{ $t('table.search') }}
      </el-button>
    </query-item>
    <slot name="button"></slot>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import QueryItem from '@/views/components/QueryItem'
export default {
  name: 'Query',
  components: { QueryItem },
  directives: { waves },
  data() {
    return {}
  },
  methods: {
    onSearch() {
      this.$emit('search')
    }
  }
}
</script>

<style scoped>

</style>
