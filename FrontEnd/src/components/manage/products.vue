 <template>
  <div>
    <div class="headerDiv">
      <logo class="logo" />
      <div class="slotInHeader" style="right:20px;margin-top:-5px">
        <el-button type="primary" @click="dialogFormVisible=true">新建</el-button>
        <authentication style="margin-left:30px"/>
      </div>
    </div>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" @close="resetForm('form') ">
      <el-form :model="form" ref="form">
        <el-form-item label="产品名称" :rules="[ { required: true, message: '产品名称不能为空'}] " prop="name">
          <el-input v-model="form.name " auto-complete="off "></el-input>
        </el-form-item>
        <el-form-item label="产品描述" :rules="[ { required: true, message: '产品描述不能为空'}] " prop="desc">
          <el-input v-model="form.desc " auto-complete="off " type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="产品Logo" :rules="[ { required: true, message: '产品Logo不能为空'}] " prop="logoUrl">
          <div class="avatar-container">
            <el-upload class="avatar-uploader" ref=avatarUplaod style="border: 1px dashed #d9d9d9;" :action="uploadUrl" :with-credentials="true" :show-file-list="false" :on-success="handleAvatarSuccess " :before-upload="beforeAvatarUpload ">
              <img v-if="localLogoUrl" :src="localLogoUrl" class="avatar ">
              <i v-else class="el-icon-plus avatar-uploader-icon "></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer ">
        <el-checkbox v-model="form.public" class="publicCheckbox ">设为公开</el-checkbox>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form') ">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData " style="width:100%;height:100%;flex:1 " v-loading.body="loading " :default-sort="{prop: 'name', order: 'ascending'}">
      <el-table-column type="expand">
        <template scope="props ">
          <P v-html="props.row.desc ">
          </P>
        </template>
      </el-table-column>
      <el-table-column prop="name " label="产品名称 " min-width="300 ">
        <template scope="scope ">
          <div class="horizontalDiv ">
            <div class="circleDiv namePrefix ">
              <img v-lazy="scope.row.logoUrl" class="productLogo " />
            </div>
            {{scope.row.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="public" label="是否公开 " min-width="100 " sortable>
        <template scope="scope ">
          {{scope.row.public?'是':'否'}}
          </el-row>
        </template>
      </el-table-column>
       <el-table-column prop="createTime" label="创建时间" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.createTime|dateConverter(null)}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.updateTime|dateConverter(null)}}
        </template>
      </el-table-column>
      <el-table-column prop="_createUser.name" label="创建者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_lastUpdateUser.name" label="最后修改者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="logoUrl " label="操作菜单 " min-width="100 ">
        <template scope="scope ">
          <el-button type="text " size="small " @click="editProduct(scope.row) ">编辑</el-button>
          <el-button type="text " size="small " @click="deleteProduct(scope.row._id) ">删除</el-button>
          <el-button type="text " size="small " @click="goToDetail(scope.row._id) ">进入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import logo from "../common/logo";
import message from "../../config/mixin/message";
import authentication from "../common/authentication";

export default {
  mixins: [message],
  data() {
    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        desc: "",
        logoUrl: "",
        public: true
      },
      localLogoUrl: null,
      uploadUrl: env.serverConfig.serverUploadUrl,
      productWait2Edit: null
    };
  },

  components: {
    logo,
    authentication
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.loading = true;
      api
        .getProducts()
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.showError_Get(error);
        });
    },

    deleteProduct(productId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api
          .deleteProduct(productId)
          .then(res => {
            this.showSuccess_Delete();
            this.tableData.remove("_id", productId);
          })
          .catch(error => {
            this.showError_Delete(error);
          });
      });
    },

    editProduct(product) {
      this.productWait2Edit = product;
      this.form.name = this.productWait2Edit.name;
      this.form.desc = this.productWait2Edit.desc;
      this.form.logoUrl = this.productWait2Edit.logoUrl;
      this.form.public = this.productWait2Edit.public;
      this.localLogoUrl = this.productWait2Edit.logoUrl;
      this.dialogFormVisible = true;
    },

    goToDetail(productId) {
      sessionStorage.setProductId(productId);
      this.$router.push("/manager/packages");
    },

    handleAvatarSuccess(res, file) {
      this.form.logoUrl = res.data;
      this.localLogoUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isJPG_PNG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG_PNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }

      return isJPG_PNG && isLt2M;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.productWait2Edit) {
            api
              .updateProduct(this.productWait2Edit._id, this.form)
              .then(res => {
                this.showSuccess_Update();
                this.resetForm(formName);
                this.getProducts();
              })
              .catch(error => {
                this.showError_Update(error);
              });
          } else {
            api
              .createProduct(this.form)
              .then(res => {
                this.showSuccess_Create();
                this.resetForm(formName);
                this.getProducts();
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
      this.localLogoUrl = null;
      this.productWait2Edit = null;
      this.form.public = true;
    }
  }
};
</script> 

<style scoped>
.productLogo {
  width: 40px;
  height: 40px;
}

.avatar-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
  height: 100px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 98px;
  height: 98px;
}
</style>
