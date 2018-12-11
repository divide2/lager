<template>
  <div class="app-container">
    <query @search="find">
      <query-item slot="query">
        <el-input v-model="query.imei" :placeholder="$t('product.name')" style="width: 200px;" @keyup.enter.native="find"/>
      </query-item>
      <query-item slot="button">
        <router-link class="filter-item" to="/product/add">
          <el-button type="primary" icon="el-icon-edit">{{ $t('table.add') }}</el-button>
        </router-link>
      </query-item>
    </query>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="80"/>
      <el-table-column align="center" label="ID" prop="id" width="100">
        <img slot-scope="{row}" :src="row.image" width="90" height="90"/>
      </el-table-column>
      <el-table-column :label="$t('product.name')" width="160px" prop="name" align="center" />
      <el-table-column :label="$t('product.remarks')" prop="remarks" align="center"/>
      <el-table-column :label="$t('table.actions')" width="350" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/product/update/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete"
                     @click="remove(scope.row.id)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
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
    find() {
      this.listLoading = true
      MineApi.findProducts(this.query).then(data => {
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

