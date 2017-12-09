export default {
  methods: {
    showSuccess(msg) {
      this.$message({
        message: msg,
        type: 'success'
      });
    },

    showSuccess_Create() {
      this.showSuccess("创建成功。");
    },

    showSuccess_Update() {
      this.showSuccess("更新成功。");
    },

    showSuccess_Delete() {
      this.showSuccess("删除成功。");
    },

    showSuccess_Get() {
      this.showSuccess("获取成功。");
    },

    showError(prefixMsg, error) {
      var msg = "未知错误。";

      if (error) {
        if (error instanceof String)
          msg = prefixMsg ? `${prefixMsg}：${error}` : error;
        else if (error.response.data.msg)
          msg = prefixMsg ? `${prefixMsg}：${error.response.data.msg}` : error.response.data.msg;
      }

      this.$message.error(msg);
    },

    showError_Create(error) {
      this.showError("创建失败", error);
    },

    showError_Update(error) {
      this.showError("更新失败", error);
    },

    showError_Delete(error) {
      this.showError("删除失败", error);
    },

    showError_Get(error) {
      this.showError("获取失败", error);
    },
  }
}
