 <template>
  <div>
    <div class="slotInHeader">
      <el-button type="primary" @click="dialogFormVisible = true">添加产品用户</el-button>
    </div>
    <el-dialog title="新建" :visible.sync="dialogFormVisible" @close="resetForm('form')" @open="openIamUserForm('form')">
      <div style="overflow-y:auto;max-height:500px">
        <ul>
          <li v-for="(item,index) in iamUsers" class="list-group-item" :key="index">
            <el-checkbox v-model="item.selected" style="margin-right:10px" />
             <img src="../../../dist/img/avatar.png" style="width:48px;height:48px;margin-right:5px;"/>  {{item.name}}
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width:100%" v-loading.body="loading" :default-sort="{prop: '_iamUser.name', order: 'ascending'}">
      <el-table-column prop="_iamUser.name" label="用户" min-width="300" sortable>
        <template scope="scope">
          <div class="horizontalDiv">
           <img src="../../../dist/img/avatar.png" style="width:48px;height:48px;margin-right:5px;margin-top:10px;margin-bottom:10px"/> {{scope.row._iamUser.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="_iamUser.email" label="邮箱" min-width="300" sortable>
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
      </el-table-column>
      <el-table-column prop="_createUser.name" label="创建者" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="_lastUpdateUser.name" label="修改者" min-width="100" sortable>
      </el-table-column> -->
      <el-table-column label="操作菜单" min-width="100">
        <template scope="scope">
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
import async from "async";
import message from "../../config/mixin/message";

export default {
  mixins: [message],
  data() {
    return {
      tableData: [],
      iamUsers: [],
      loading: false,
      dialogFormVisible: false,
      productId: null
    };
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
        .getUsers(this.productId)
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
          .deleteUser(id)
          .then(res => {
            this.showSuccess_Delete();
            this.tableData.remove("_id", id);
          })
          .catch(error => {
            this.showError_Delete(error);
          });
      });
    },

    openIamUserForm(formName) {
      if (this.iamUsers.length == 0) {
        api
          .getIamUsers()
          .then(res => {
            var list = res.data.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            list.forEach(item => (item.selected = false));
            this.iamUsers = list;
          })
          .catch(error => {
            this.showError_Get(error);
          });
      }

      this.iamUsers.forEach(item => (item.selected = false));
    },

    submitForm(formName) {
      var self = this;
      var selectedUser = this.iamUsers.filter(
        item =>
          item.selected &&
          !self.tableData.find(i => i._iamUser._id === item._id)
      );
      var tasks = [];

      selectedUser.forEach(item => {
        var closureItem = {
          _product :self.productId,
          _iamUser:item._id
        };
        
        tasks.push(function() {
          api.createUser(closureItem);
        });
      });

      async.parallel(tasks, function(err, results) {
        //此callback没执行
        if (err) this.showError_Create(err);

        self.listData();
        self.dialogFormVisible = false;
      });

      self.dialogFormVisible = false;

      //上面的callback没执行
      setTimeout(function() {
        self.listData();
      }, 500);
    },

    resetForm(formName) {
      this.dialogFormVisible = false;
    }
  }
};
</script> 

<style scoped>
.list-group-item {
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  flex-direction: row;
}
</style>
