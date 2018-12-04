<template>
  <el-select :value="value" :placeholder="placeholder" multiple filterable @change="change">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"/>
  </el-select>
</template>

<script>
import ExpectApi from '@/api/ExpectApi'

export default {
  name: 'ExpectSelect',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    ExpectApi.list().then(data => {
      this.list = data
    })
  },
  methods: {
    change(value) {
      this.$emit('change', value)
    }
  }
}
</script>
