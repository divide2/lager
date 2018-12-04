<template>
  <div style="padding-bottom: 200px;">
    <el-form ref="dataForm" :rules="rules" :model="device" label-width="150px"
             style="margin-left:50px;margin-top: 50px;">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('device.imei')" prop="imei">
            <el-input v-model="device.imei"/>
          </el-form-item>
          <el-form-item :label="$t('device.type')" prop="typeId">
            <device-type-select v-model="device.typeId"/>
          </el-form-item>
          <el-form-item :label="$t('device.name')" prop="name">
            <el-input v-model="device.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item :label="$t('device.versionUrl')" prop="versionUrl">
            <el-col :span="15">
              <el-input v-model="device.versionUrl"/>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="resolve">{{ $t('table.autoResolve') }}</el-button>
            </el-col>
          </el-form-item>
          <el-col :span="12">
            <el-form-item :label="$t('device.version.entire')" prop="version.entire">
              <el-input v-model="device.version.entire"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.app')" prop="version.app">
              <el-input v-model="device.version.app"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ccuFirmware')" prop="version.ccuFirmware">
              <el-input v-model="device.version.ccuFirmware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ccuHardware')" prop="version.ccuHardware">
              <el-input v-model="device.version.ccuHardware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ecuFirmware')" prop="version.ecuFirmware">
              <el-input v-model="device.version.ecuFirmware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ecuHardware')" prop="version.ecuHardware">
              <el-input v-model="device.version.ecuHardware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.lib')" prop="version.lib">
              <el-input v-model="device.version.lib"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.meterFirmware')" prop="version.meterFirmware">
              <el-input v-model="device.version.meterFirmware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ble')" prop="version.ble">
              <el-input v-model="device.version.ble"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.ecuSerialNumber')" prop="version.ecuSerialNumber">
              <el-input v-model="device.version.ecuSerialNumber"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.innerBatteryFirmware')" prop="version.innerBatteryFirmware">
              <el-input v-model="device.version.innerBatteryFirmware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.innerBatteryHardware')" prop="version.innerBatteryHardware">
              <el-input v-model="device.version.innerBatteryHardware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.innerBatterySerialNumber')"
                          prop="version.innerBatterySerialNumber">
              <el-input v-model="device.version.innerBatterySerialNumber"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.meterHardware')" prop="version.meterHardware">
              <el-input v-model="device.version.meterHardware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.meterUi')" prop="version.meterUi">
              <el-input v-model="device.version.meterUi"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.outerBatteryFirmware')" prop="version.outerBatteryFirmware">
              <el-input v-model="device.version.outerBatteryFirmware"/>
            </el-form-item>
            <el-form-item :label="$t('device.version.outerBatteryHardware')" prop="version.outerBatteryHardware">
              <el-input v-model="device.version.outerBatteryHardware"/>
            </el-form-item>

          </el-col>
        </el-col>
      </el-row>

    </el-form>
    <el-row style="text-align: center;margin-top: 20px;">
      <el-col :span="16">
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="save">{{ $t('table.save') }}</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import DeviceApi from '@/api/DeviceApi'
import DeviceTypeApi from '@/api/DeviceTypeApi'
import DeviceTypeSelect from '@/views/components/DeviceTypeSelect'

export default {
  name: 'DeviceDetail',
  components: { DeviceTypeSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deviceTypes: [],
      device: {
        id: 1,
        imei: '',
        name: '',
        productionDate: null,
        remark: '',
        typeId: 1,
        versionUrl: '',
        version: {
          app: '',
          ble: '',
          ccuFirmware: '',
          ccuHardware: '',
          ecuFirmware: '',
          ecuHardware: '',
          ecuSerialNumber: '',
          entire: '',
          innerBatteryFirmware: '',
          innerBatteryHardware: '',
          innerBatterySerialNumber: '',
          lib: '',
          meterFirmware: '',
          meterHardware: '',
          outerBatteryFirmware: '',
          outerBatteryHardware: '',
          meterUi: ''
        }
      },
      rules: {
        imei: [{ required: true, trigger: 'blur' }],
        typeId: { required: true, trigger: 'change' },
        'version.entire': { required: true, trigger: 'blur' },
        'version.app': { required: true, trigger: 'blur' },
        'version.ccuFirmware': { required: true, trigger: 'blur' },
        'version.ccuHardware': { required: true, trigger: 'blur' },
        'version.ecuFirmware': { required: true, trigger: 'blur' },
        'version.ecuHardware': { required: true, trigger: 'blur' },
        'version.lib': { required: true, trigger: 'blur' },
        'version.meterFirmware': { required: true, trigger: 'blur' },
        'version.ble': { required: true, trigger: 'blur' }
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.device.id = this.$route.params.id
      this.get()
    }
    this.listDeviceType()
  },
  methods: {
    /**
     * api调用
     */

    save() {
      this.$refs['dataForm'].validate().then(() => {
        if (this.isEdit) {
          return DeviceApi.update(this.device)
        } else {
          return DeviceApi.add(this.device)
        }
      }).then(() => this.toList())
    },
    listDeviceType() {
      DeviceTypeApi.list().then(data => {
        this.deviceTypes = data
      })
    },
    get() {
      DeviceApi.get(this.device.id).then(data => {
        this.device = data
        this.device.version = data.version || {}
      })
    },
    /**
     * 解析文件
     */
    resolve() {
      DeviceApi.getVersion({ url: this.device.versionUrl }).then(data => {
        const { dependcies: { CCU, AP, ECU, hardware }, version } = data
        this.device.version = {
          app: CCU.dependcies.APP,
          ble: '',
          ccuFirmware: AP.version,
          ccuHardware: hardware[0],
          ecuFirmware: ECU.version,
          ecuHardware: ECU.hardware[0],
          ecuSerialNumber: '',
          entire: version,
          innerBatteryFirmware: '',
          innerBatteryHardware: '',
          innerBatterySerialNumber: '',
          lib: CCU.dependcies.LIB,
          meterFirmware: '',
          meterHardware: '',
          outerBatteryFirmware: '',
          outerBatteryHardware: ''
        }
      })
    },
    /**
     * other
     */
    cancel() {
      this.$router.back()
    },
    toList() {
      this.$router.push({
        path: '/device/list'
      })
    }
  }
}
</script>
