<template>
  <div class="app-container">
    <el-tabs v-model="query.status" @tab-click="find">
      <el-tab-pane :label="$t('table.all')" name=" "></el-tab-pane>
      <el-tab-pane v-for="status in orderStatuses" :key="status.id" :label="$t(`${status.groupCode}.${status.code}`)"
                   :name="status.value"></el-tab-pane>
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
      <el-table-column :label="$t('order.balancePayment')" prop="balancePayment" align="center"/>
      <el-table-column :label="$t('order.createTime')" width="160px" prop="createTime" align="center"/>
      <el-table-column :label="$t('order.deliveryDate')" prop="deliveryDate" align="center"/>
      <el-table-column :label="$t('order.earnestMoney')" width="160px" prop="earnestMoney" align="center"/>
      <el-table-column :label="$t('order.toName')" width="160px" prop="fromName" align="center"/>
      <el-table-column :label="$t('order.remarks')" prop="remarks" align="center"/>
      <el-table-column :label="$t('table.actions')" v-if="query.status.trim()" width="180" align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="query.status==='waiting_receive'" type="success" style="margin-left:15px;" size="small"
                     icon="el-icon-check"
                     @click="showConfirmReceiveDialog(row.id)">{{ $t('table.confirmReceive') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.size" @pagination="find"/>

    <el-dialog :visible.sync="confirmReceiveDialog">
      <el-form ref="receiveParamForm" :rules="rules" :model="receiveParam" label-position="right" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('product.warehouse')" prop="warehouseId">
          <mine-warehouse-select v-model="receiveParam.warehouseId" @change="onWarehouseChange"></mine-warehouse-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmReceiveDialog = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="confirmReceive">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import Query from '@/views/components/Query'
import QueryItem from '@/views/components/QueryItem'
import MineApi from '@/api/MineApi'
import DictionaryApi from '@/api/DictionaryApi'
import OrderApi from '@/api/OrderApi'
import MineWarehouseSelect from '@/views/stock/stock/components/MineWarehouseSelect'
import StockApi from '@/api/StockApi' // Waves directive

export default {

  name: 'AutoTestList',
  components: { MineWarehouseSelect, QueryItem, Query, Pagination },
  data() {
    return {
      list: [],
      cases: [],
      total: 0,
      confirmReceiveDialog: false,
      listLoading: true,
      orderStatuses: [],
      receiveParam: {
        warehouseId: null,
        orderId: ''
      },
      warehouseStock: [],
      orderSpec: [],
      query: {
        name: '',
        status: ' ',
        page: 0,
        size: 10
      },
      rules: {
        warehouseId: [{ required: true }]
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
      let data = await MineApi.findSendOrder(this.query)
      this.listLoading = false
      this.list = data.content
      this.total = data.totalElements
    },
    async confirmReceive(id) {
      await this.$refs.receiveParamForm.validate()
      await this.$confirm(this.$t('message.confirmDeliver'))
      await OrderApi.confirmReceive(this.receiveParam)
      this.find()
    },
    async listOrderStatus() {
      this.orderStatuses = await DictionaryApi.listByGroup('status.order')
    },
    async onWarehouseChange(warehouseId) {
      this.warehouseStock = await StockApi.listByWarehouse(warehouseId)
    },
    async listOrderProductSpec(orderId) {
      this.orderSpec = await OrderApi.listOrderProductSpecByOrder(orderId)
    },
    /**
     * inner
     */
    showConfirmReceiveDialog(id) {
      this.receiveParam.orderId = id
      this.listOrderProductSpec(id)
      this.confirmReceiveDialog = true
    }
  }
}
</script>

