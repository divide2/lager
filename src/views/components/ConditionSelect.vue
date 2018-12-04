<template>
  <el-select :value="value" :placeholder="placeholder" filterable @change="change">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"/>
  </el-select>
</template>

<script>
import ConditionApi from '@/api/ConditionApi'

export default {
  name: 'ConditionSelect',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Number,
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
    ConditionApi.list().then(data => {
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
