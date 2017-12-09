 <template>
  <div>
    <div class="slotInHeader">
      <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
    </div>
    <el-dialog title="上传文档" :visible.sync="dialogFormVisible" @close="resetForm('form')">
      <el-upload class="upload-demo" :multiple="true" :action="uploadUrl" :file-list="fileList" :with-credentials="true" :on-success="handleFileSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">支持批量操作，可单次选择多个文件上传。</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="public" class="publicCheckbox">设为公开</el-checkbox>
        <el-button type="primary" @click="submitForm('form')">关闭</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: 'name', order: 'ascending'}">
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
       <!-- <el-table-column prop="createTime" label="创建时间" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.createTime|dateConverter(null)}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.updateTime|dateConverter(null)}}
        </template>
      </el-table-column> -->
      <el-table-column prop="_createUser.name" label="创建者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_lastUpdateUser.name" label="最后修改者" min-width="100" sortable>
      </el-table-column>
      <el-table-column label="操作菜单" min-width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="download(scope.row._id)">下载</el-button>
          <el-button type="text" size="small" @click="deleteData(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import download from "../../config/mixin/download";
import fileIcon from "../common/fileIcon";
import message from "../../config/mixin/message";

export default {
  mixins: [download, message],
  data() {
    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      productId: null,
      uploadUrl: env.serverConfig.serverUploadUrl,
      fileList: [],
      public: true
    };
  },

  components: {
    fileIcon
  },

  mounted() {
    this.productId = sessionStorage.getProductId();

    if (this.productId) this.listData();
    else this.$router.push("/products");
  },

  methods: {
    listData() {
      this.loading = true;
      api
        .getDocs(this.productId)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.showError_Get(error);
        });
    },

    deleteData(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api
          .deleteDoc(id)
          .then(res => {
            this.showSuccess_Delete();
            this.tableData.remove("_id", id);
          })
          .catch(error => {
            this.showError_Delete(error);
          });
      });
    },

    submitForm(formName) {
      this.dialogFormVisible = false;
      this.listData();
    },

    resetForm() {
      this.fileList = [];
      this.public = true;
    },

    handleFileSuccess(res, file) {
      var form = {
        name: file.name,
        size: file.size,
        path: res.data,
        _product: this.productId,
        public: this.public
      };

      api
        .createDoc(form)
        .then(res => {
          this.showSuccess_Create();
        })
        .catch(error => {
          this.showError_Create(error);
        });
    }
  }
};
</script> 

<style scoped>

</style>
