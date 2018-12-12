<template>
  <el-select :value="value" :placeholder="placeholder" filterable @change="change">
    <el-option
      v-for="item in list"
      :key="item.toId"
      :label="item.memoName"
      :value="item.toId"/>
  </el-select>
</template>

<script>
import MineApi from '@/api/MineApi'

export default {
  name: 'MineFriendSelect',
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
    MineApi.listFriend().then(data => {
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
