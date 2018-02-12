 <template>
  <div class="divRoot">
    <div class="divVersionContainer">
      <versionList :productId="productId" @versionChanged="versionChanged" />
    </div>
    <el-tabs style="flex:1;align-self:stretch" v-model="activeName" v-show="selectedVersionId" @tab-click="handleTabClick">
      <el-tab-pane label="最新版" name="最新版">
        <newest-package-list :productId="productId" :versionId="selectedVersionId" ref="最新版" />
      </el-tab-pane>
      <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in platforms" v-bind:key="index">
        <package-list :productId="productId" :versionId="selectedVersionId" :platformId="item._id" :ref="item.name" v-bind:key="index" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import versionList from "./common/versionList";
import newestPackageList from "./common/newestPackageList";
import packageList from "./common/packageList";

export default {
  data() {
    return {
      productId: null,
      platforms: [],
      selectedVersionId: null,
      activeName: "最新版",
      tab: null
    };
  },

  components: {
    versionList,
    newestPackageList,
    packageList
  },

  computed: {
    currentTab: function() {
      if (!this.activeName) return null;

      var ele = this.$refs[this.activeName];

      if (!ele) return null;

      if (ele instanceof Array) return ele[0];

      return ele;
    }
  },

  mounted() {
    this.productId = this.$route.params.id;
    sessionStorage.setProductId(this.productId);

    if (!this.productId) {
      this.$router.push("/products");
    } else {
      this.getPlatforms();
    }
  },

  methods: {
    getPlatforms() {
      if (this.productId) {
        api
          .getPlatforms(this.productId)
          .then(res => {
            this.platforms = res.data.data;
          })
          .catch(error => {
            this.$message.error("获取失败。");
          });
      }
    },

    versionChanged(versionId) {
      this.selectedVersionId = versionId;
      if (this.currentTab) {
        var self = this;
        setTimeout(function() {
          self.currentTab.refresh();
        }, 100);
      }
    },

    handleTabClick(tab, event) {
      if (this.currentTab) this.currentTab.refresh();
    }
  }
};
</script> 

<style scoped>
.divRoot {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.divRoot .divVersionContainer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 400px;
  min-width: 300px;
  padding-right: 40px;
}

@media screen and (max-width: 1000px) {
  .divRoot {
    flex-direction: column;
    align-items: center;
  }
}
</style>
