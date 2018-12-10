<template>
  <div style="padding-bottom: 200px;">
    <el-form ref="dataForm" :rules="rules" :model="product" label-position="right" label-width="150px"
             style="margin-top: 50px">
      <el-row>
        <el-col :span="7">
          <el-form-item :label="$t('stock.warehouse')" prop="remarks">
            <mine-warehouse-select v-model="stock.warehouseId"></mine-warehouse-select>
          </el-form-item>
          <el-form-item :label="$t('stock.product')" prop="remarks">
            <mine-product-select v-model="stock.productId" @change="onProductChange"></mine-product-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-col :span="14">
            <el-form-item  label-width="50px">
              {{ $t('product.specName') }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  label-width="10px">
              {{ $t('product.specPrice') }}
            </el-form-item>
          </el-col>
          <div v-for="(spec,index) in product.specs" :key="index">
            <el-col :span="14">
              <el-form-item prop="specName" label-width="50px">
                <el-input v-model="spec.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item  prop="specPrice" label-width="10px">
                <el-input v-model="spec.price"/>
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
        productId: null
      },
      product: {
        specs: []
      },
      rules: {}
    }
  },
  created() {
    if (this.isEdit) {
      this.product.id = this.$route.params.id
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
          return ProductApi.update(this.product)
        } else {
          return ProductApi.add(this.product)
        }
      }).then(() => this.toList())
    },
    get() {
      ProductApi.get(this.product.id).then(data => {
        this.product = data
        this.product.version = data.version || {}
      })
    },
    onProductChange(productId) {
      ProductApi.listProductSpec(productId).then(data => {
        this.product.specs = data;
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
    toList() {
      this.$router.push({
        path: '/product/list'
      })
    }
  }
}
</script>
