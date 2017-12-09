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
    var logonUser = sessionStore.getLogonUser();

    if (logonUser) {
      sessionStore.removeStore(env.store.user);

      var fn = () => {
        var a = document.createElement("a");
        a.href = `${env.serverConfig.iamLogoutRedirectUrl}?service=${window
          .location.href}`;
        a.click();
      };
 
      api
        .iamLogout()
        .then(res => {
          fn();
        })
        .catch(error => {
          fn();
        });
    } else {
      this.$router.replace("/products");
    }
  }
};
</script>
