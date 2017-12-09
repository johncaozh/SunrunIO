 <template>
  <div style="min-height:400px">
    <el-collapse v-show="tableData.length>0">
      <el-collapse-item v-for="(item,index) in tableData" :key="index" :title="item.name" :name="index">
        <div v-html="item.desc"></div>
      </el-collapse-item>
    </el-collapse>
    <empty v-show="!loading&&tableData.length==0" />
    <loading v-if="loading" />
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env"
import sessionStorage from '../../config/sessionStore'
import loading from '../common/loading'
import empty from '../common/empty'

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      productId: null,
    }
  },

  components: {
    loading,
    empty,
  },

  mounted() {
    this.productId = sessionStorage.getProductId();
    this.listData();
  },

  methods: {
    listData() {
      this.loading = true;
      api.getFaqs(this.productId)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error('获取失败。');
        });
    },
  }
}
</script> 

<style scoped>

</style>
