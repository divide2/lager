<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.name" :placeholder="$t('cases.name')" style="width: 200px;"
                @keyup.enter.native="find"/>
      <el-select v-model="query.type" clearable class="filter-item" @change="find">
        <el-option v-for="item in casesTypes" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                 @click="find">{{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="toCreate">{{ $t('table.add') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" type="index" width="80"/>
      <el-table-column :label="$t('cases.name')" width="160px" prop="name" align="center"/>
      <el-table-column :label="$t('cases.type')" prop="type" align="center"/>
      <el-table-column :label="$t('cases.instruction')" prop="instruction" align="center"/>
      <el-table-column :label="$t('cases.at')" prop="at" align="center"/>

      <el-table-column :label="$t('table.actions')" width="350" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit"
                     @click="toUpdate(scope.row.id)">{{ $t('table.edit') }}
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete"
                     @click="remove(scope.row.id)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.current" :limit.sync="query.size"
                @pagination="find"/>

    <el-dialog :visible.sync="formDialogVisible">
      <el-form ref="dataForm" :rules="rules" :model="cases" label-position="right" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('cases.name')" prop="name">
          <el-input v-model="cases.name"/>
        </el-form-item>

        <el-form-item :label="$t('cases.type')" prop="type">
          <el-select v-model="cases.type" class="filter-item">
            <el-option v-for="item in casesTypes" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('cases.instruction')" prop="instruction">
          <el-input v-model="cases.instruction"/>
        </el-form-item>
        <el-form-item :label="$t('cases.at')" prop="at">
          <el-input v-model="cases.at"/>
        </el-form-item>
        <el-form-item :label="$t('cases.expect')" prop="expectIds">
          <expect-select v-model="cases.expectIds"/>
        </el-form-item>
        <el-form-item :label="$t('cases.description')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="cases.description" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formDialogVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?add():update()">{{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
import DeviceTypeSelect from '@/views/components/DeviceTypeSelect'
import ConditionSelect from '@/views/components/ConditionSelect'
import CaseApi from '@/api/CaseApi'
import ExpectSelect from '@/views/components/ExpectSelect' // Waves directive
const casesTypes = ['Auto', 'Manual']
export default {
  name: 'CasesList',
  components: { ExpectSelect, ConditionSelect, DeviceTypeSelect, Pagination },
  directives: { waves },
  data() {
    return {
      list: [],
      total: 0,
      casesTypes,
      textMap: [],
      listLoading: true,
      dialogStatus: '',
      formDialogVisible: false,
      cases: {
        name: '',
        type: '',
        instruction: '',
        at: '',
        expectIds: [],
        description: ''
      },
      query: {
        current: 1,
        size: 10
      },
      rules: {}
    }
  },
  created() {
    this.find()
  },
  methods: {
    find() {
      this.listLoading = true
      CaseApi.find(this.query).then(data => {
        this.list = data.records
        this.total = data.total
        this.listLoading = false
      })
    },
    remove(id) {
      this.$confirm(this.$t('message.remove')).then(() => {
        CaseApi.remove(id).then(() => {
          this.find()
        })
      })
    },
    add() {
      this.$refs['dataForm'].validate().then(_ => {
        CaseApi.add(this.cases).then(_ => {
          this.formDialogVisible = false
          this.find()
        })
      })
    },
    update() {
      this.$refs['dataForm'].validate().then(_ => {
        CaseApi.update(this.cases).then(_ => {
          this.formDialogVisible = false
          this.find()
        })
      })
    },
    /**
     * visible
     */
    toUpdate(id) {
      CaseApi.get(id).then(data => {
        this.cases = data
      })
      this.formDialogVisible = true
      this.dialogStatus = 'edit'
    },
    toCreate() {
      this.resetData()
      this.formDialogVisible = true
      this.dialogStatus = 'create'
    },
    resetData() {
      this.cases = {
        name: '',
        type: '',
        instruction: '',
        at: '',
        expectIds: [],
        description: ''
      }
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
