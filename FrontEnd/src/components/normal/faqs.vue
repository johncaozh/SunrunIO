 <template>
  <div style="min-height:400px">
    <el-collapse v-show="tableData.length>0">
      <el-collapse-item v-for="(item,index) in tableData" :key="index">
        <template slot="title">
          <div style="display:flex;align-items:center;margin-top:-43px;margin-left:20px">
            <span style="flex:1">
              {{item.name}}
            </span>
            <el-button type="text" size="small" style="padding:0px;margin-left:20px;margin-right:20px" @click.stop="copyLink(item._id)">复制链接</el-button>
          </div>
        </template>
        <div v-html="item.desc"></div>
      </el-collapse-item>
    </el-collapse>
    <empty v-show="!loading&&tableData.length==0" />
    <loading v-if="loading" />
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import message from "../../config/mixin/message";
import sessionStorage from "../../config/sessionStore";
import loading from "../common/loading";
import empty from "../common/empty";

export default {
  mixins: [message],
  data() {
    return {
      tableData: [],
      loading: false,
      productId: null
    };
  },

  components: {
    loading,
    empty
  },

  mounted() {
    this.productId = this.$route.params.id;
    sessionStorage.setProductId(this.productId);
    this.listData();
  },

  methods: {
    listData() {
      this.loading = true;
      api
        .getFaqs(this.productId)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error("获取失败。");
        });
    },

    copyLink(id) {
      var instance = this;
      this.$copyText(`${window.location.host}/faqs/${id}`).then(
        function(e) {
          instance.showSuccess("已复制到剪贴板。");
        },
        function(e) {
          instance.showError(null, "复制到剪贴板失败。");
        }
      );
    }
  }
};
</script> 

<style scoped>

</style>
