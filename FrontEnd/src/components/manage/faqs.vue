<template>
  <div>
    <div class="slotInHeader">
      <el-button type="primary" @click="dialogFormVisible = true">新建</el-button>
    </div>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" @close="resetForm('form')">
      <el-form :model="form" ref="form">
        <el-form-item label="请输入标题" :rules="[ { required: true, message: '请输入标题'}]" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入内容" :rules="[ { required: true, message: '请输入内容'}]" prop="desc">
          <quill-editor class="quill-editor" v-model="form.desc" ref="myQuillEditor">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="form.public" class="publicCheckbox">设为公开</el-checkbox>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: 'name', order: 'descending'}">
      <el-table-column type="expand">
        <template scope="props">
          <P v-html="props.row.desc">
          </P>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="FAQ标题" min-width="400">
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
      <el-table-column prop="logoUrl" label="操作菜单" min-width="100">
        <template scope="scope">
          <el-button type="text" size="small" @click="editData(scope.row)">
            编辑</el-button>
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
import { quillEditor } from "vue-quill-editor";
import message from "../../config/mixin/message";

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
        public: true,
        _product: ""
      },
      dataWait2Edit: null,
      productId: null
    };
  },

  computed: {},

  components: {
    quillEditor
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
        .getFaqs(this.productId)
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
          .deleteFaq(id)
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
      this.form.public = this.dataWait2Edit.public;
      this.form._product = this.dataWait2Edit._product;
      this.dialogFormVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dataWait2Edit) {
            api
              .updateFaq(this.dataWait2Edit._id, this.form)
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
              .createFaq(this.form)
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
    }
  }
};
</script>

<style scoped>

</style>
