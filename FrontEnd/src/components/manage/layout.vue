 <template>
  <div>
    <logo class="logo" :value="1"/>
    <authentication class="authentication" style="margin-top:-5px"/>
    <el-row style="height:100%;">
      <el-menu theme="dark" :default-active="defaultActive" mode="horizontal" :router="true" class="menu" style="padding-right:120px">
        <el-menu-item index="/manager/users" style="float:right">用户</el-menu-item>
        <el-menu-item index="/manager/versions" style="float:right">版本</el-menu-item>
        <el-menu-item index="/manager/platforms" style="float:right">平台</el-menu-item>
        <el-menu-item index="/manager/faqs" style="float:right">FAQ</el-menu-item>
        <el-menu-item index="/manager/docs" style="float:right">文档</el-menu-item>
        <el-menu-item index="/manager/packages" style="float:right">安装包</el-menu-item>
      </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;width:100%">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import logo from "../common/logo";
import authentication from "../common/authentication"

export default {
  data() {
    return {
      prodoctId: ""
    };
  },

  components: {
    logo,
    authentication
  },

  methods: {},

  computed: {
    defaultActive: function() {
      return this.$route.path;
    }
  },

  mounted() {
    this.prodoctId = this.$route.params.productId;
  }
};
</script> 

<style scoped>
.menu {
  padding: 15px;
}
</style>
