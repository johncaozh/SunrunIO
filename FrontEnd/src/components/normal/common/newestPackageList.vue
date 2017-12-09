<template>
    <div style="min-height:400px">
        <div>
            <transition-group name="list" class="container">
                <div v-for="(item,index) in newestPackages" v-bind:key="index">
                    <el-card class="card" :body-style="{ padding: '0px' }">
                        <div class="verticalDiv">
                            <div class="circleDiv">
                                <os-platform :os="item._platform.os" style="width:64px;height:64px" />
                            </div>
                            <h3> 最新版 for {{item._platform.name}}
                            </h3>
                            <p style="line-height:20px;text-align:center">
                                V{{item.version}}
                                <br/> {{item.size|sizeUnitConverter(item.size)}}
                                <br/>{{item.publishDate|dateConverter(null)}}
                            </p>
                            <div class="bottomOperate" @click="download(item._id)">
                                立即下载
                            </div>
                        </div>
                    </el-card>
                </div>
            </transition-group>
        </div>
        <empty v-show="!loading&&newestPackages.length==0" />
        <loading v-if="loading" />
    </div>
</template>

<script>
import api from "../../../config/api";
import osPlatform from "../../common/osPlatform";
import fileIcon from "../../common/fileIcon";
import download from "../../../config/mixin/download";
import loading from "../../common/loading";
import empty from "../../common/empty";

export default {
  mixins: [download],
  data() {
    return {
      newestPackages: ["占位符号，避免empty组件的出现"],
      loading: false
    };
  },

  components: {
    osPlatform,
    fileIcon,
    loading,
    empty
  },

  props: {
    productId: {
      required: false,
      default: null,
      type: String
    },
    versionId: {
      required: false,
      default: null,
      type: String
    },
    autoLoadData: {
      required: false,
      default: false,
      type: Boolean
    }
  },

  mounted() {},

  methods: {
    getPackages() {
      if (this.productId && this.versionId) {
        this.newestPackages = [];
        this.loading = true;
        api
          .getPackages(this.productId, this.versionId)
          .then(res => {
            this.loading = false;
            this.newestPackages = res.data.data;
          })
          .catch(error => {
            this.loading = false;
            this.$message.error("获取失败。");
          });
      }
    },
    downloadData(id) {
      var a = document.createElement("a");
      a.href = env.serverConfig.serverDownloadUrl + "/" + id;
      a.click();
    },

    refresh() {
      this.getPackages();
    }
  },

  watch: {
    productId() {
      if (this.autoLoadData) this.getPackages();
    },

    versionId() {
      if (this.autoLoadData) this.getPackages();
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;
  flex-wrap: wrap;
  padding-top: 20px;
  height: 100%;
  overflow-y: hidden;
}

.card{
  margin-right: 20px;
}

.list-enter-active {
  transition: all 0.8s;
}

.list-enter {
  opacity: 0;
  transform: translateY(100px);
}

@media screen and (max-width: 1300px) {
  .container {
    justify-content: space-around;
  }
}
</style>

