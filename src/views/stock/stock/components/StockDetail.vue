<template>
  <div style="padding-bottom: 200px;">
    <el-form ref="dataForm" :rules="rules" :model="product" label-position="right" label-width="150px"
             style="margin-top: 50px">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('stock.warehouse')" prop="remarks">
            <mine-warehouse-select v-model="stock.warehouseId"></mine-warehouse-select>
          </el-form-item>
          <el-form-item :label="$t('stock.product')" prop="remarks">
            <mine-product-select v-model="stock.productId" @change="onProductChange"></mine-product-select>
          </el-form-item>
          <div v-for="(spec,index) in product.specs" :key="index">
            <el-col :span="14">
              <el-form-item :label="$t('product.specName')" prop="specName">
                {{ spec.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('stock.specAmount')" prop="specPrice" label-width="80px">
                <el-input v-model="stock.specStocks[index].amount"/>
              </el-form-item>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="text-align: center;margin-top: 20px;">
      <el-col :span="21">
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="save">{{ $t('table.save') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductApi from '@/api/ProductApi'
import MineWarehouseSelect from '@/views/stock/stock/components/MineWarehouseSelect'
import MineProductSelect from '@/views/stock/stock/components/MineProductSelect'
import StockApi from '@/api/StockApi'

export default {
  name: 'StockDetail',
  components: { MineProductSelect, MineWarehouseSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stock: {
        warehouseId: null,
        productId: null,
        specStocks: []
      },
      product: {
        specs: []
      },
      rules: {}
    }
  },
  created() {
    if (this.isEdit) {
      this.stock.productId = this.$route.params.id
      this.get()
    }
  },
  methods: {
    /**
     * api调用
     */

    save() {
      this.$refs['dataForm'].validate().then(() => {
        if (this.isEdit) {
          return StockApi.update(this.stock)
        } else {
          return StockApi.add(this.stock)
        }
      }).then(() => this.back())
    },
    get() {
      ProductApi.get(this.product.id).then(data => {
        this.product = data
        this.product.version = data.version || {}
      })
    },
    onProductChange(productId) {
      ProductApi.listProductSpec(productId).then(data => {
        this.product.specs = data
        this.stock.specStocks.push(...(data.map(item => ({ productSpecId: item.id, amount: 0 }))))
      })
    },
    /**
     * 解析文件
     */
    /**
     * other
     */
    cancel() {
      this.$router.back()
    },
    back() {
      this.$router.back()
    }
  }
}
</script>
