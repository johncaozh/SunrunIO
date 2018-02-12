<template>
    <div style="min-height:400px">
        <ul class="waterfall">
            <transition-group name="list" tag="p">
                <li v-for="(item, index) in packages" v-bind:key="index">
                    <div class="flexDiv">
                        <span class="date">{{item.publishDate|dateConverter(null)}}</span>
                        <div class="vericalSepector">
                            <div class="node" />
                            <div class="vericalDIV" />
                        </div>
                        <div class="vericalDiv">
                            <span>
                                <span class="title">V{{item.version}}</span>
                                <span class="size">{{item.size|sizeUnitConverter(item.size)}}</span>
                                <el-button type="text" size="small" class="download" @click="download(item._id)">下载</el-button>
                                <el-button type="text" size="small" class="download" @click="copyLink(item._id)">复制链接</el-button>
                            </span>
                            <p class="desc" v-html="item.desc">
                            </p>
                        </div>
                    </div>
                </li>
            </transition-group>
        </ul>
        <empty v-show="!loading&&packages.length==0" />
        <loading v-if="loading" />
    </div>
</template>
<script>
import api from "../../../config/api";
import download from "../../../config/mixin/download";
import message from "../../../config/mixin/message";
import empty from "../../common/empty";
import loading from "../../common/loading";

export default {
  mixins: [download, message],
  data() {
    return {
      packages: [],
      loading: false
    };
  },

  components: {
    empty,
    loading
  },

  props: {
    productId: {
      required: true,
      default: null,
      type: String
    },
    versionId: {
      required: true,
      default: null,
      type: String
    },
    platformId: {
      required: true,
      default: null,
      type: String
    },
    autoLoadData: {
      required: false,
      default: false,
      type: Boolean
    }
  },

  mounted() {
    this.getPackages();
  },

  methods: {
    getPackages() {
      if (this.productId && this.versionId && this.platformId) {
        this.packages = [];
        this.loading = true;
        api
          .getPackages(this.productId, this.versionId, this.platformId)
          .then(res => {
            this.loading = false;
            this.packages = res.data.data;
          })
          .catch(error => {
            this.loading = false;
            this.$message.error("获取失败。");
          });
      }
    },

    refresh() {
      this.getPackages();
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
    }
  },

  watch: {
    productId: function() {
      if (this.autoLoadData) this.getPackages();
    },

    versionId: function() {
      if (this.autoLoadData) this.getPackages();
    },

    platformId: function() {
      if (this.autoLoadData) this.getPackages();
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
  cursor: pointer;
}

li:hover .node {
  width: 17px;
  height: 17px;
  background-color: #20a0ff;
  border: 0;
}

.list-enter-active {
  transition: all 0.8s;
}

.list-enter {
  opacity: 0;
  transform: translateY(100px);
}
</style>

