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
                <i class="el-icon-share i-copyLink" @click="copyLink(item._id)" title="复制链接"/>
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
import message from "../../../config/mixin/message";
import loading from "../../common/loading";
import empty from "../../common/empty";

export default {
  mixins: [message, download],
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

    copyLink(id) {
      var instance = this;
      this.$copyText(`${window.location.host}/packages/${id}`).then(
        function(e) {
          instance.showSuccess("已复制到剪贴板。");
        },
        function(e) {
          instance.showError(null, "复制到剪贴板失败。");
        }
      );
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

.card {
  margin-right: 20px;
}

.list-enter-active {
  transition: all 0.8s;
}

.list-enter {
  opacity: 0;
  transform: translateY(100px);
}

.i-copyLink {
  cursor: pointer;
  font-size: 16px;
  color: #409EFF;
  margin-left: 10px;
}

@media screen and (max-width: 1300px) {
  .container {
    justify-content: space-around;
  }
}
</style>

