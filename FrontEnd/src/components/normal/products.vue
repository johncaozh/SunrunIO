<template>
  <div>
    <logo class="logo" />
    <div class="banner">
      <div class="banner-sky">
      </div>
      <img src="data:image/png;base64,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gAABAgQIECBAgAABAnkUSG8c+N6/0mbz3aSWNnsVGELvF/Yt/PFicnyj137bCBAgQIAAAQIECBCorkD7xTqT137z3onXf/fe16uroPO8C2y9uNVX7p7/Yqte/25Wa229h6/Qm/flUx8BAgQIECBAgACB2QmE0HvmrQvP1FrZ10IVjST580s/eu7D2VVkZgK9BR6+lUrY9fcDy//svPIr9PYGs5UAAQIECORJIPzSmX1wbin769nFPNWlFgIEyi/QHXpDx5tZ9owrv+Vf+yJ2uHXFNxYfrvxuNupHv/ToI39ye3NUMRIgQIAAgfwJhF861y+tLNXT9IlQXWOueS355ulb+atURQQIlFHgl29dOJw0W9/u1dtcPf3DT3747J1e+2wjMAuBzwXfWRRhTgIECBAgQGA0ge7QG58t/EYJIwECkxZo/xxKX/vt+8tJ2vzMHSetVmP15ZMnrkx6fucnMIrA1q3OozzJsQQIECBAgMCMBf52bjFe6e2sZHO9vpRdfGVf5zaPCRAgMAmBJElaP3vxxPmsVd+600TonYS0c45DQPAdh6JzECBAgACBaQsc/vAfrXrz393Ttt+g8KPk+M/Xurf7mgABApMQ6Ay/Qu8khJ1zXAJudR6XpPMQIECAAIEpC2TZL9KND756NG3WD4apH4beb/30oymXYToCBAjUwp9ftD8yFATyKiD45nVl1EWAAAECBIYQiOH3kbS+lgi9Q4g5hAABAgQIECBAgAABAgQKJxCutBSuaAUTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGJC2RZll67dm354sWLhyY+mQkqIZBWoktNEiBAgAABAgQIECBQCIEQeldXV5dbrdaX0zQVfguxavkvMsl/iSokQIDA7gTCP6DhDEmStHZ3Js8mQIAAAQIEJikQQ2878C7GeTY3N7N2CD5//Pjxm3GbkcCoAoLvqGKOJ0CgUALhH9C3L90+Fop+4anHLwu/hVo+xRIgQIBAhQR6hd7YvvAbJYw7FRB8dyrneQQI5F4ght72dd7HQrHt6753hN/cL5sCCRAgQKCCAoNCb+QQfqOEcScCgu9O1DyHAIHcC3SH3liw8BsljAQIECBAIB8Cw4TeWKnwGyWMowp4catRxRxPgEDuBfqF3lB4uPobbn0Ox+S+EQUSIECAAIEKCFy9enVP+9/lfcO02mg0kvn5+QPDHOsYAp0CfvHr1PCYAAECBAgQIECAAIGpChw5cmR9bm7unWaz+Z/tJm4fs7q0tLS63XH2E+gWcKtzt4ivCRAohUC/q75udS7F8mqCAAECBEoocP369fn19fXn6/X6Qq/2Qug9duzYlV77bCOwnYDgu52Q/QQIFFagO/wKvYVdSoUTIECAQEUE+oVfobci3wATbFPwnSCuUxMgMHuBGH5DJV7RefbroQICBAgQILCdQHf4FXq3E7N/GAHBdxglxxAgUGiBEH5DA97Dt9DLqHgCBAgQqJBADL/tlm+4vblCC69VAgQIECBAgAABAgQIVEmg/R/XjSr1q1cCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECuxPIsizZ3Rk8mwABAvkTSPNXkooIECBAgAABAgRmIdAOvel/V1a+c/fVlaOzmN+cBAgQmJSA/9GblKzzEiBAgAABAgQKJPBp6F3ONmuLoexmK1k98PKpKwVqQakECBDoKyD49qWxgwABAgQIECBQDYHu0Bu7Fn6jhJEAgaILuNW56CuofgIECBAgQIDALgT6hd5wynqaPXl3xW3Pu+D1VAIEciLgim9OFkIZBAgQIECAAIFpCwwKvZ21NPe0b3s+5bbnThOPCRAoloArvsVaL9USIECAAAECBMYm8MkbbzwX/6Z30EnrD7In7585tzToGPsIECCQZwHBN8+rozYCBAgQIECAwAQFsvvpx82slW03RZYk63MH997a7jj7CRAgkFcBtzrndWXURYAAAQIECBCYgsDaK7861EofLNeTtOfvhSH0Lhzc/05y8uTaFMoxBQECBCYi0PMH3ERmclICBAgQIECAAIFcCvQLv0JvLpdLUQQI7EBA8N0BmqcQIECAAAECBMom0B1+hd6yrbB+CFRbQPCt9vrrngABAgQIECCwJRDDb5rWN9zevMXiAQECBAgQIECAAAECBAiUSWDt7NnF7M0395WpJ70QIEDgf01Qh63gZYluAAAAAElFTkSuQmCC"
        alt="Element" class="banner-stars">
      <img src="../../../dist/svg/bannerBG.svg" class="bannerBG" />
      <div class="banner-desc">
        <h2>Sunrun产品快速发布平台</h2>
        <h6>一个用于将产品/项目开发过程中涉及到的安装包、文档、FAQ信息自动发布的网站，它可以自动化邮件通知、IM通知等流程。</h6>
        <div v-if="links.length>0" style="font-size:16px;margin-top:50px">常用入口</div>
        <ul v-if="links.length>0" style="font-size:16px;padding-left:0px">
          <li v-for="(item,index) in links" :key="index" style="margin-bottom:10px;">
            <a :href="item.url" target="_blank" class="link">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div>
      </div>
      <authentication class="authentication" />
    </div>
    <div class="productsContainer">
      <transition-group name="list" tag="ul" class="productsContainer">
        <div v-for="(item,index) in tableData" :key="index">
          <el-card class="card" style="margin-right:40px;" :body-style="{ padding: '0px' }">
            <div class="verticalDiv">
              <div class="circleDiv">
                <img v-lazy="item.logoUrl" style="width:64px;height:64px">
              </div>
              <h3>{{item.name}}</h3>
              <p style="padding-left:15px;padding-right:15px;">{{item.desc}}</p>
              <div class="bottomOperate" @click="$router.push(`/products/${item._id}/packages`)">
                查看详情
              </div>
            </div>
          </el-card>
        </div>
      </transition-group>
      <empty v-show="!loading&&tableData.length==0" content="这里的东西都外星人偷走了。" style="margin-top:100px" />
      <loading v-if="loading" style="margin-top:100px" />
    </div>
  </div>
</template>
<script>
  import api from "../../config/api";
  import env from "../../config/env";
  import logo from "../common/logo";
  import authentication from "../common/authentication.vue";
  import loading from "../common/loading";
  import empty from "../common/empty";
  import sessionStorage from "../../config/sessionStore.js";

  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        logonUser: null,
        links: []
      };
    },

    components: {
      logo,
      loading,
      empty,
      authentication
    },

    mounted() {
      if (this.$route.st) {
        this.$router.push({
          path: '/login',
          query: {
            st: this.$route.st
          }
        });
        return;
      }

      this.getProducts();
      this.getLinks();
      this.logonUser = sessionStorage.getLogonUser();
    },

    methods: {
      getProducts() {
        this.tableData = [];
        this.loading = true;
        api
          .getProducts()
          .then(res => {
            this.tableData = res.data.data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            this.$message.error("获取失败。");
          });
      },
      getLinks() {
        this.links = [];
        this.loading = true;
        api
          .getLinks()
          .then(res => {
            this.links = res.data.data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            this.$message.error("获取失败。");
          });
      }
    }
  };

</script>

<style scoped>
  .logo {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
    height: 90px;
    display: flex;
    align-items: center;
    padding-left: 15px;
  }

  .banner {
    position: relative;
    height: 420px;
    color: #fff;
    margin-bottom: 180px;
  }

  .banner-sky {
    position: absolute;
    top: -150px;
    bottom: -15px;
    width: 100%;
    margin-top: -140px;
    transform: skewY(-5deg);
    transform-origin: center;
    background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4);
  }

  img.banner-stars {
    position: relative;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bannerBG {
    position: absolute;
    top: 70px;
    right: 160px;
  }

  .banner-desc {
    padding-left: 200px;
    top: -60px;
    font-size: 46px;
    position: relative;
    z-index: 10;
  }

  .banner-desc h2 {
    font-size: 40px;
    margin: 0;
    color: #fff;
  }

  .banner-desc h6 {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    color: #fff;
    max-width: 500px;
  }

  .productsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: hidden;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .list-enter-active {
    transition: all 0.8s;
  }

  .list-enter {
    opacity: 0;
    transform: translateY(100px);
  }

  .link {
    color: white;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 1200px) and (max-width: 1400px) {
    .bannerBG {
      right: 80px;
    }

    .banner-desc {
      padding-left: 100px;
    }
  }

  @media screen and (max-width: 1200px) {
    .banner-desc {
      padding-left: 60px;
    }

    .bannerBG {
      display: none;
    }
  }

  @media screen and (max-width: 1000px) {
    img.banner-stars {
      display: none;
    }

    .banner-desc {
      top: 160px;
    }

    .banner-desc h2 {
      font-size: 32px;
    }

    .banner-desc h6 {
      font-size: 14px;
    }
  }

</style>
