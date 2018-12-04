<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.imei" placeholder="imei" style="width: 200px;"
                @keyup.enter.native="find"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                 @click="find">{{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="toCreate">{{ $t('table.add') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id" width="80"/>
      <el-table-column width="160px" prop="imei" align="center" label="IMEI"/>
      <el-table-column :label="$t('device.type')" prop="typeName" align="center"/>

      <el-table-column :label="$t('device.version.app')" class-name="status-col">
        <template slot-scope="scope">
          {{ scope.row.version && scope.row.version.app }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" width="350" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/device/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete"
                     @click="remove(scope.row.id)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.current" :limit.sync="query.size"
                @pagination="find"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import DeviceApi from '@/api/DeviceApi' // Secondary package based on el-pagination
import waves from '@/directive/waves'
import DeviceTypeSelect from '@/views/components/DeviceTypeSelect'
import ConditionSelect from '@/views/components/ConditionSelect' // Waves directive

export default {

  name: 'AutoTestList',
  components: { ConditionSelect, DeviceTypeSelect, Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Success: 'success',
        Testing: 'warning',
        Fail: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      cases: [],
      total: 0,
      testDialogVisible: false,
      listLoading: true,
      query: {
        lastTestTime: [],
        imei: '',
        current: 1,
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
      const query = {
        imei: this.query.imei,
        size: this.query.size,
        current: this.query.current,
        testStartTime: this.query.lastTestTime && this.query.lastTestTime[0],
        testEndTime: this.query.lastTestTime && this.query.lastTestTime[1]
      }
      DeviceApi.find(query).then(data => {
        this.list = data.records
        this.total = data.total
        this.listLoading = false
      })
    },
    remove(id) {
      this.$confirm(this.$t('message.remove')).then(() => {
        DeviceApi.remove(id).then(() => {
          this.find()
        })
      })
    },
    /**
     * router
     */
    toCreate() {
      this.$router.push('/device/create')
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
