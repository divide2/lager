<template>
  <div style="padding-bottom: 200px;">
    <el-form ref="dataForm" :rules="rules" :model="product" label-position="right" label-width="150px"
             style="margin-top: 50px">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('purchase.friend')" prop="friend">
            <mine-friend-select v-model="purchase.toId" @change="onFriendChange"></mine-friend-select>
          </el-form-item>
          <el-form-item :label="$t('purchase.product')" prop="product">
            <el-select>
              <el-option v-for="p in products" :key="p.id" :label="p.name" :value="p.id"></el-option>
            </el-select>
          </el-form-item>
          <div v-for="(spec,index) in product.specs" :key="index">
            <el-col :span="14">
              <el-form-item :label="$t('product.specName')" prop="specName">
                {{ spec.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('purchase.specAmount')" prop="specPrice" label-width="80px">
                <el-input v-model="purchase.specStocks[index].amount"/>
              </el-form-item>
            </el-col>
          </div>
          <el-form-item :label="$t('purchase.earnestMoney')" prop="earnestMoney">
            <el-input v-model="purchase.earnestMoney"/>
          </el-form-item>
          <el-form-item :label="$t('purchase.balancePayment')" prop="balancePayment">
            <el-input v-model="purchase.balancePayment"/>
          </el-form-item>
          <el-form-item :label="$t('purchase.deliveryDate')" prop="deliveryDate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="purchase.deliveryDate"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('purchase.remarks')" prop="remarks">
            <el-input type="textarea" v-model="purchase.remarks"/>
          </el-form-item>
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
import MineFriendSelect from '@/views/stock/stock/components/MineFriendSelect'

export default {
  name: 'StockDetail',
  components: { MineFriendSelect, MineProductSelect, MineWarehouseSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      purchase: {
        toId: null,
        warehouseId: null,
        productId: null,
        specStocks: []
      },
      products: [],
      product: {
        specs: []
      },
      rules: {}
    }
  },
  created() {
    if (this.isEdit) {
      this.purchase.productId = this.$route.params.id
      this.get()
    }
  },
  methods: {
    /**
     * api调用
     */

    save() {
      this.$refs['dataForm'].validate().then(() => {
        return PurchaseApi.add(this.purchase)
      }).then(() => this.back())
    },
    get() {
      ProductApi.get(this.product.id).then(data => {
        this.product = data
        this.product.version = data.version || {}
      })
    },
    onFriendChange(id) {
      ProductApi.listByUser(id).then(data => {
        this.products = data
      })
    },
    onProductChange(productId) {
      ProductApi.listProductSpec(productId).then(data => {
        this.product.specs = data
        this.purchase.specStocks.push(...(data.map(item => ({ productSpecId: item.id, amount: 0,productId: productId }))))
      })
    },
    /**
     * 解析文件
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
