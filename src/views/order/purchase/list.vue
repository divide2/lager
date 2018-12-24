<template>
  <div class="app-container">
    <query @search="find">
      <template slot="query">
        <query-item>
          <el-input v-model="query.status" :placeholder="$t('order.status')"
                    @keyup.enter.native="find"/>
        </query-item>
        <query-item>
          <el-date-picker v-model="query.createTime" type="date" @change="find" value-format="yyyy-MM-dd"/>
        </query-item>
      </template>
    </query>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="80"/>
      <el-table-column :label="$t('order.balancePayment')" width="160px" prop="balancePayment" align="center"/>
      <el-table-column :label="$t('order.createTime')" width="160px" prop="createTime" align="center"/>
      <el-table-column :label="$t('order.deliveryDate')" width="160px" prop="deliveryDate" align="center"/>
      <el-table-column :label="$t('order.earnestMoney')" width="160px" prop="earnestMoney" align="center"/>
      <el-table-column :label="$t('order.toName')" width="160px" prop="toName" align="center"/>
      <el-table-column :label="$t('order.status')" width="160px" prop="status" align="center"/>
      <el-table-column :label="$t('order.remarks')" prop="remarks" align="center"/>
      <el-table-column :label="$t('table.actions')" width="180" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" style="margin-left:15px;" size="small" icon="el-icon-delete"
                     @click="remove(scope.row.id)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.size" @pagination="find"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import ProductApi from '@/api/ProductApi' // Secondary package based on el-pagination
import Query from '@/views/components/Query'
import QueryItem from '@/views/components/QueryItem'
import MineApi from '@/api/MineApi' // Waves directive

export default {

  name: 'AutoTestList',
  components: { QueryItem, Query, Pagination },
  data() {
    return {
      list: [],
      cases: [],
      total: 0,
      testDialogVisible: false,
      listLoading: true,
      query: {
        name: '',
        page: 0,
        size: 10
      },
      x: {
        balancePayment: 12,
        createTime: '2018-12-18T20:00:10',
        deliveryDate: '2018-12-11',
        earnestMoney: 12,
        fromId: 1,
        id: 1,
        orderId: 1,
        remarks: '12',
        toId: 2,
        toName: '小婷婷'
      },
      testParams: {
        deviceId: null,
        deviceTypeId: null,
        caseIds: [],
        conditionId: null
      }
    }
  },
  created() {
    this.find()
  },
  methods: {
    async find() {
      this.listLoading = true
      let data = await MineApi.findPurchaseOrder(this.query)
      this.listLoading = false
      this.list = data.content
      this.total = data.totalElements
    },
    remove(id) {
      this.$confirm(this.$t('message.remove')).then(() => {
        ProductApi.remove(id).then(() => {
          this.find()
        })
      })
    },
    /**
     * router
     */

  }
}
</script>

