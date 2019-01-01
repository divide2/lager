<template>
  <div class="app-container">
    <el-tabs v-model="cur">
      <el-tab-pane :label="$t('table.friend')" name="friends">
        <el-table :data="friends">
          <el-table-column type="index" lang="ID"></el-table-column>
          <el-table-column :label="$t('friend.avatar')">
            <template slot-scope="{ row }">
              <img :src="row.avatar" width="90" height="90"/>
            </template>
          </el-table-column>
          <el-table-column :label="$t('friend.memoName')" prop="memoName"></el-table-column>
          <el-table-column :label="$t('table.actions')">
            <template slot-scope="{ row }">
              <el-button type="primary" size="small">{{ $t('table.sendMessage') }}</el-button>
              <el-button type="danger" size="small">{{ $t('table.deleteFriend') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('table.chat')" name="chat">
        <el-row>
          <el-col :span="5">
            <div v-for="f in friends" :key="f.id" class="chater">
              <img width="40" height="40" :src="f.avatar"/>
              <span>{{ f.memoName }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <el-input type="textarea" v-model="content"></el-input>
            <el-button @click="send">{{ $t('table.send') }}</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { Client } from '@stomp/stompjs'
import MineApi from '@/api/MineApi'

export default {
  name: 'Message',
  data() {
    return {
      content: '',
      client: null,
      friends: [],
      cur: 'friends'
    }
  },
  mounted() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8081/portfolio?access_token=' + getToken(),
      connectHeaders: {
        Authorization: `bearer ${getToken()}`
      }
    })
    this.client.activate()
    this.listFriend()
    /*this.client = Stomp.client('ws://localhost:8081/portfolio?access_token='+getToken())
    this.client.connect({}, (e) => {})
    this.client.subscribe = ('/app/user/position-updates-bvvy', (p, s) => {
      console.log(p, s)
    })*/
  },
  methods: {
    send() {
      this.client.publish({
        destination: '/app/topic/send/message/ctt',
        body: this.content
      })
      this.client.subscribe(
        '/user/queue/receive/message', message => {
          console.log(message)
        })
    },
    async listFriend() {
      this.friends = await MineApi.listFriend()
    },
    async listChat() {
      this.chats = await MineApi.listChat()
    }
  }
}
</script>

<style scoped lang="scss">
.chater {
  padding: 10px;
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
  & > * {
    vertical-align: center;
  }
}
</style>
