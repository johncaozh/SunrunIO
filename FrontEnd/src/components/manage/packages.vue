 <template>
  <div>
    <div class="slotInHeader">
      <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
    </div>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" @close="resetForm('form')" @open="openedForm">
      <el-form :model="form" ref="form">
        <el-form-item label="请选择安装包" :rules="[ { required: true, message: '请选择上传一个文件'}]" prop="path">
          <el-upload :action="uploadUrl" :show-file-list="false" :auto-upload="true" :with-credentials="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="请输入安装包名称" :rules="[ { required: true, message: '请输入安装包名称'}]" prop="name">
          <el-input v-model="form.name" auto-complete="off" type="text" placeholder="请输入安装包名称"></el-input>
        </el-form-item>
        <el-form-item label="请输入版本号" :rules="[ { required: true, message: '请输入版本号'}]" prop="version">
          <el-input v-model="form.version" auto-complete="off" type="text" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="请选择大版本" :rules="[ { required: true, message: '请选择大版本'}]" prop="_version">
          <el-select v-model="form._version" placeholder="请选择大版本" style="width:100%">
            <el-option v-for="item in versions" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择运行平台" :rules="[ { required: true, message: '请选择运行平台'}]" prop="_platform">
          <el-select v-model="form._platform" placeholder="请选择运行平台" style="width:100%">
            <el-option v-for="item in platforms" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择发布日期" :rules="[ { required: true, message: '请选择发布日期'}]" prop="publishDate">
          <el-date-picker v-model="form.publishDate" type="date" placeholder="请选择发布日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请输入更新信息" prop="desc">
          <quill-editor v-model="form.desc" ref="myQuillEditor">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="form.public" class="publicCheckbox">设为公开</el-checkbox>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: 'version', order: 'ascending'}">
      <el-table-column type="expand">
        <template scope="props">
          <P v-html="props.row.desc">
          </P>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="安装包" min-width="300" sortable>
        <template scope="scope">
          <div class="horizontalDiv">
            <div class="circleDiv namePrefix">
              <os-platform :os="scope.row._platform.os" style="width:32px;height:32px" />
            </div>
            {{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.size|sizeUnitConverter(scope.row.size)}}
        </template>
      </el-table-column>
      <el-table-column prop="publishDate" label="发布日期" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.publishDate|dateConverter(null)}}
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_version.name" label="大版本" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_platform.name" label="平台" min-width="100" sortable>
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
          <el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteData(scope.row._id)">删除</el-button>
          <el-button type="text" size="small" @click="download(scope.row._id)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import { quillEditor } from "vue-quill-editor";
import osPlatform from "../common/osPlatform";
import download from "../../config/mixin/download";
import message from "../../config/mixin/message";

export default {
  mixins: [download, message],

  data() {
    return {
      tableData: [],
      versions: [],
      platforms: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        size: "",
        path: "",
        desc: "",
        publishDate: "",
        version: "",
        public: true,
        _version: "",
        _platform: "",
        _product: ""
      },

      dataWait2Edit: null,
      productId: null,
      uploadUrl: env.serverConfig.serverUploadUrl
    };
  },

  components: {
    quillEditor,
    osPlatform
  },

  mounted() {
    this.productId = sessionStorage.getProductId();
    this.form.productId = this.productId;

    if (this.productId) {
      this.listData();
    } else this.$router.push("/products");
  },

  methods: {
    listData() {
      this.loading = true;
      api
        .getPackages(this.productId)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.showError_Get(error);
        });
    },

    getVersions() {
      api
        .getVersions(this.productId)
        .then(res => {
          this.versions = res.data.data;
        })
        .catch(error => {
          this.showError_Get(error);
        });
    },

    getPlatforms() {
      api
        .getPlatforms(this.productId)
        .then(res => {
          this.platforms = res.data.data;
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
          .deletePackage(id)
          .then(res => {
            this.showSuccess_Delete();
            this.tableData.remove("_id", id);
          })
          .catch(error => {
            this.showError_Delete(error);
          });
      });
    },

    editData(data) {
      this.dataWait2Edit = data;
      this.form.name = this.dataWait2Edit.name;
      this.form.desc = this.dataWait2Edit.desc;
      this.form.size = this.dataWait2Edit.size;
      this.form.path = this.dataWait2Edit.path;
      this.form.publishDate = this.dataWait2Edit.publishDate;
      this.form.public = this.dataWait2Edit.public;
      this.form.version = this.dataWait2Edit.version;
      this.form._version = this.dataWait2Edit._version._id;
      this.form._platform = this.dataWait2Edit._platform._id;
      this.form._product = this.dataWait2Edit._product;
      this.dialogFormVisible = true;
    },

    beforeAvatarUpload(file) {
      this.form.name = file.name;
      this.form.size = file.size;
      var group = file.name.match(/\d+(\.\d+){1,3}/);

      if (group && group.length > 0) this.form.version = group[0];
      else this.form.version = "";

      return true;
    },

    handleAvatarSuccess(res, file) {
      this.form.path = res.data;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dataWait2Edit) {
            api
              .updatePackage(this.dataWait2Edit._id, this.form)
              .then(res => {
                this.showSuccess_Update();
                this.resetForm(formName);
                this.listData();
              })
              .catch(error => {
                this.showError_Update(error);
              });
          } else {
            this.form._product = this.productId;
            api
              .createPackage(this.form)
              .then(res => {
                this.showSuccess_Create();
                this.resetForm(formName);
                this.listData();
              })
              .catch(error => {
                this.showError_Create(error);
              });
          }
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.dataWait2Edit = null;
      this.form.public = true;
    },

    openedForm() {
      this.getVersions();
      this.getPlatforms();
    }
  }
};
</script> 

<style scoped>
.name {
  display: flex;
  align-items: center;
}
</style>
