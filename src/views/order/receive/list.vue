<template>
  <div class="app-container">
    <el-tabs v-model="query.status" @tab-click="find">
      <el-tab-pane :label="$t('table.all')" name=" "></el-tab-pane>
      <el-tab-pane v-for="status in orderStatuses" :key="status.id" :label="$t(`${status.groupCode}.${status.code}`)" :name="status.value"></el-tab-pane>
    </el-tabs>
    <query @search="find">
      <template slot="query">
        <query-item>
          <el-date-picker v-model="query.createTime" type="date" @change="find" value-format="yyyy-MM-dd"/>
        </query-item>
      </template>
    </query>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" type="index" width="80"/>
      <el-table-column :label="$t('order.balancePayment')"  prop="balancePayment" align="center"/>
      <el-table-column :label="$t('order.createTime')" width="160px" prop="createTime" align="center"/>
      <el-table-column :label="$t('order.deliveryDate')" prop="deliveryDate" align="center"/>
      <el-table-column :label="$t('order.earnestMoney')" width="160px" prop="earnestMoney" align="center"/>
      <el-table-column :label="$t('order.toName')" width="160px" prop="fromName" align="center"/>
      <el-table-column :label="$t('order.remarks')" prop="remarks" align="center"/>
      <el-table-column :label="$t('table.actions')" v-if="query.status.trim()" width="180" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="query.status==='waiting_confirm'" type="success" style="margin-left:15px;" size="small" icon="el-icon-check"
                     @click="confirm(scope.row.id)">{{ $t('table.confirmOrder') }}
          </el-button>
          <el-button v-if="query.status==='waiting_deliver'" type="success" style="margin-left:15px;" size="small" icon="el-icon-check"
                     @click="confirmDeliver(scope.row.id)">{{ $t('table.confirmDeliver') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.size" @pagination="find"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Query from '@/views/components/Query'
import QueryItem from '@/views/components/QueryItem'
import MineApi from '@/api/MineApi'
import DictionaryApi from '@/api/DictionaryApi'
import OrderApi from '@/api/OrderApi' // Waves directive

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
      orderStatuses: [],
      query: {
        name: '',
        status: ' ',
        page: 0,
        size: 10
      }
    }
  },
  created() {
    this.find()
    this.listOrderStatus()
  },
  methods: {
    async find() {
      this.listLoading = true
      let data = await MineApi.findReceiveOrder(this.query)
      this.listLoading = false
      this.list = data.content
      this.total = data.totalElements
    },
    async confirm(id) {
      await this.$confirm(this.$t('message.confirmOrder'))
      await OrderApi.confirm(id)
      this.find()
    },
    async confirmDeliver(id) {
      await this.$confirm(this.$t('message.confirmDeliver'))
      await OrderApi.confirmDeliver(id)
      this.find()
    },
    async confirmReceive(id) {
      await this.$confirm(this.$t('message.confirmDeliver'))
      await OrderApi.confirmReceive(id)
      this.find()
    },
    async listOrderStatus() {
      this.orderStatuses = await DictionaryApi.listByGroup("status.order")
    }
    /**
     * router
     */

  }
}
</script>

