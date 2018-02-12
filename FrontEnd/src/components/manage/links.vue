<template>
  <div>
    <div class="headerDiv">
      <logo class="logo" />
      <div class="slotInHeader" style="right:20px;margin-top:-5px">
        <el-button type="primary" @click="dialogFormVisible=true">新建链接</el-button>
        <authentication style="margin-left:50px" />
      </div>
    </div>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" @close="resetForm('form')">
      <el-form :model="form" ref="form" :rules="urlRule">
        <el-form-item label="请输入链接名称" :rules="[ { required: true, message: '请输入链接名称'}]" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入链接地址" prop="url">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="form.public" class="publicCheckbox">设为公开</el-checkbox>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: 'name', order: 'descending'}">
      <el-table-column prop="name" label="链接名称" min-width="300">
      </el-table-column>
      <el-table-column prop="url" label="链接地址" min-width="400">
      </el-table-column>
      <el-table-column prop="public" label="是否公开" min-width="100" sortable>
        <template scope="scope">
          {{scope.row.public?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column prop="_createUser.name" label="创建者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_lastUpdateUser.name" label="修改者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="logoUrl" label="操作菜单" min-width="120">
        <template scope="scope">
          <el-button type="text" size="small" @click="editData(scope.row)"> 编辑</el-button>
          <el-button type="text" size="small" @click="deleteData(scope.row._id)">删除</el-button>
          <el-button type="text" size="small" @click="openLink(scope.row.url)">打开链接</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import message from "../../config/mixin/message";
import logo from "../common/logo";
import authentication from "../common/authentication";
import validator from "validator";

export default {
  mixins: [message],
  data() {
    var checkUrl = (rule, value, callback) => {
      if (!value) {
        return callback();
      }

      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        return callback(new Error("请填写带http或https协议头的合法URL"));
      }

      var isUrl = validator.isURL(value, ["http", "https"]);

      if (isUrl) {
        return callback();
      } else {
        return callback(new Error("请填写带http或https协议头的合法URL"));
      }
    };

    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        url: "",
        public: true,
        _product: ""
      },
      urlRule: {
        url: [
          {
            validator: checkUrl,
            trigger: "blur"
          }
        ]
      },
      dataWait2Edit: null,
      productId: null
    };
  },

  computed: {},

  components: {
    logo,
    authentication
  },

  mounted() {
    this.listData();
  },

  methods: {
    listData() {
      this.loading = true;
      api
        .getLinks(this.productId)
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
          .deleteLink(id)
          .then(res => {
            this.showSuccess_Delete();
            this.tableData.remove("_id", id);
          })
          .catch(error => {
            this.showError_Delete(error);
          });
      });
    },

    openLink(url) {
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
    },

    editData(data) {
      this.dataWait2Edit = data;
      this.form.name = this.dataWait2Edit.name;
      this.form.url = this.dataWait2Edit.url;
      this.form.public = this.dataWait2Edit.public;
      this.dialogFormVisible = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dataWait2Edit) {
            api
              .updateLink(this.dataWait2Edit._id, this.form)
              .then(res => {
                this.showSuccess_Update();
                this.resetForm(formName);
                this.listData();
              })
              .catch(error => {
                this.showError_Update(error);
              });
          } else {
            api
              .createLink(this.form)
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
