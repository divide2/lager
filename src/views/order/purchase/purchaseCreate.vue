<template>
  <div style="padding-bottom: 200px;">
    <el-form ref="dataForm" :rules="rules" :model="product" label-position="right" label-width="150px"
             style="margin-top: 50px">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('order.friend')" prop="friend">
            <mine-friend-select v-model="purchase.toId" @change="onFriendChange"></mine-friend-select>
          </el-form-item>
          <el-form-item :label="$t('order.product')" prop="product">
            <el-select v-model="purchase.productId" @change="onProductChange">
              <el-option v-for="p in products" :key="p.id" :label="p.name" :value="p.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="0">
            <div v-for="(spec,index) in product.specs" :key="index">
              <el-col :span="14">
                <el-form-item :label="$t('product.specName')" prop="specName">
                  {{ spec.name }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('order.specAmount')" prop="specPrice" label-width="80px">
                  <el-input v-model="purchase.productSpecPrices[index].amount"/>
                </el-form-item>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item :label="$t('order.earnestMoney')" prop="earnestMoney">
            <el-input v-model="purchase.earnestMoney"/>
          </el-form-item>
          <el-form-item :label="$t('order.balancePayment')" prop="balancePayment">
            <el-input v-model="purchase.balancePayment"/>
          </el-form-item>
          <el-form-item :label="$t('order.deliveryDate')" prop="deliveryDate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="purchase.deliveryDate"/>
          </el-form-item>
          <el-form-item :label="$t('order.remarks')" prop="remarks">
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
import MineProductSelect from '@/views/stock/stock/components/MineProductSelect'
import MineFriendSelect from '@/views/stock/stock/components/MineFriendSelect'
import OrderApi from '@/api/OrderApi'

export default {
  name: 'StockDetail',
  components: { MineFriendSelect, MineProductSelect },
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
        productSpecPrices: [],
        productSpecId: null,
        specName: ''
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
        return OrderApi.add(this.purchase)
      }).then(() => this.back())
    },
    get() {
      ProductApi.get(this.product.id).then(data => {
        this.product = data.content
      })
    },
    onFriendChange(id) {
      ProductApi.listByUser(id).then(data => {
        this.products = data.content
      })
    },
    onProductChange(productId) {
      const productSpecs = this.products.find(item => item.id === productId).specs
      this.product.specs = productSpecs
      this.purchase.productSpecPrices.push(...(productSpecs.map(item => (
        { productSpecId: item.id, amount: 0, productId: productId, specName: item.name }
      ))))
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
