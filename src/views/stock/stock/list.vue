<template>
  <div class="app-container">
    <query @search="find">
      <query-item slot="query">
        <mine-warehouse-select v-model="query.warehouseId"></mine-warehouse-select>
      </query-item>
      <query-item slot="button">
        <router-link class="filter-item" to="/stock/add">
          <el-button type="primary" icon="el-icon-edit">{{ $t('table.add') }}</el-button>
        </router-link>
      </query-item>
    </query>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" type="index" width="80"/>
      <el-table-column :label="$t('product.image')" align="center" prop="id" width="100">
        <img slot-scope="{row}" :src="row.product.image" width="90" height="90"/>
      </el-table-column>
      <el-table-column :label="$t('product.name')" width="160px" prop="product.name" align="center" />
      <el-table-column :label="$t('stock.amount')" width="160px" prop="amount" align="center" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page+1" :limit.sync="query.size"
                @pagination="find"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ProductApi from '@/api/ProductApi' // Secondary package based on el-pagination
import Query from '@/views/components/Query'
import QueryItem from '@/views/components/QueryItem'
import MineApi from '@/api/MineApi'
import MineWarehouseSelect from '@/views/stock/stock/components/MineWarehouseSelect' // Waves directive

export default {

  name: 'StockList',
  components: { MineWarehouseSelect, QueryItem, Query, Pagination },
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
        size: 10,
        warehouseType: 'pair',
        warehouseId: 1
      }
    }
  },
  created() {
    this.find()
  },
  methods: {
    find() {
      this.listLoading = true
      MineApi.findStock(this.query).then(data => {
        this.list = data.content
        this.total = data.totalElements
        this.listLoading = false
      })
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

