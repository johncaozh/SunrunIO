<template>
  <loading />
</template>

<script>
  import loading from "../components/common/loading";
  import env from "../config/env";
  import api from "../config/api";
  import sessionStore from "../config/sessionStore";

  export default {
    components: {
      loading
    },

    mounted() {
      var st = this.$route.query.st;
      if (st) {
        api
          .iamLogin(st)
          .then(res => {
            sessionStore.setLogonUser(res.data.data);
            this.$router.replace("/products");
          })
          .catch(err => {
            this.$confirm("登录失败", "错误", {
              confirmButtonText: "确定",
              type: "error"
            }).then(() => {
              this.$router.replace("/products");
            });
          });
      } else {
        var a = document.createElement("a");
        a.href = `${env.serverConfig.iamLoginRedirectUrl}?service=${window
        .location.href}`;
        a.click();
      }
    }
  };

</script>
