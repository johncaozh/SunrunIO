<template>
  <div style="color:white;height:48px;display:flex;align-items:center;cursor:pointer">
    <el-button type="text" @click.native="$router.push('/login')" v-show="!logonUser">登录</el-button>
    <el-popover ref="popover1" trigger="click">
      <div style="display:flex;flex-direction:column">
        <el-button type="text" @click.native="$router.push('/manager/products')" v-if="showMangerEndpoint">管理后台</el-button>
        <el-button type="text" @click.native="$router.push('/manager/links')" v-if="showMangerEndpoint" style="margin-left:0px">常用入口</el-button>
        <el-button type="text" style="margin-left:0px" @click.native="syncIamUsers">同步用户</el-button>
        <el-button type="text" @click.native="$router.push('/logout')" style="margin-left:0px">退出登录</el-button>
      </div>
    </el-popover>
    <div v-popover:popover1 style="display:flex;align-items:center;" v-show="logonUser">
      <img src="../../../dist/img/avatar.png" style="width:48px;height:48px;margin-right:5px" /> {{logonUser===null?"":logonUser.real_name}}
    </div>
  </div>
</template>

<script>
import sessionStorage from "../../config/sessionStore";
import api from "../../config/api";
import message from "../../config/mixin/message";
export default {
  mixins: [message],
  data() {
    return {
      logonUser: null,
      showMangerEndpoint: true
    };
  },

  methods: {
    syncIamUsers() {
      api
        .getIamUsers(true)
        .then(res => {
          this.showSuccess("同步完成。");
        })
        .catch(error => {
          this.showError("同步失败。", error);
        });
    }
  },

  mounted() {
    this.logonUser = sessionStorage.getLogonUser();
  }
};
</script>

<style scoped>

</style>


