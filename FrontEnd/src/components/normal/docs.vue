 <template>
  <div style="min-height:400px">
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: 'createTime', order: 'ascending'}" v-show="tableData.length>0">
      <el-table-column prop="name" label="文件名" min-width="300" sortable>
        <template scope="scope">
          <div class="horizontalDiv">
            <file-icon :fileName="scope.row.name" class="fileIcon" />{{scope.row.name}}
          </div>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.size|sizeUnitConverter(scope.row.size)}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="上传时间" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.createTime|dateConverter(null)}}
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.size|sizeUnitConverter(scope.row.size)}}
        </template>
      </el-table-column>
      <el-table-column prop="public" label="是否公开" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.public?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column label="操作菜单" min-width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="download(scope.row._id)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <empty v-show="!loading&&tableData.length==0" />
    <loading v-if="loading" />
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env"
import sessionStorage from '../../config/sessionStore'
import download from '../../config/mixin/download'
import fileIcon from '../common/fileIcon'
import loading from '../common/loading'
import empty from '../common/empty'

export default {
  mixins: [download],
  data() {
    return {
      tableData: [],
      loading: false,
      productId: null,
    }
  },

  components: {
    fileIcon,
    loading,
    empty,
  },

  mounted() {
    this.productId = sessionStorage.getProductId();

    if (this.productId)
      this.listData();
    else
      this.$router.push("/products");
  },

  methods: {
    listData() {
      this.loading = true;
      api.getDocs(this.productId)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error('获取失败。');
        });
    },

    downloadData(id) {
      var a = document.createElement('a');
      a.href = env.serverConfig.serverDownloadUrl + "/" + id;
      a.click();
    },
  }
}
</script> 

<style scoped>
.name {
  display: flex;
  align-items: center
}
</style>
