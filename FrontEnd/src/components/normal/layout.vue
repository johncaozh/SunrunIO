  <template>
  <div>
    <div>
      <logo class="logo" />
      <authentication class="authentication" style="margin-top:-6px"/>
      <div class="banner">
        <div class="banner-sky">
        </div>
        <img src="data:image/png;base64,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gAABAgQIECBAgAABAnkUSG8c+N6/0mbz3aSWNnsVGELvF/Yt/PFicnyj137bCBAgQIAAAQIECBCorkD7xTqT137z3onXf/fe16uroPO8C2y9uNVX7p7/Yqte/25Wa229h6/Qm/flUx8BAgQIECBAgACB2QmE0HvmrQvP1FrZ10IVjST580s/eu7D2VVkZgK9BR6+lUrY9fcDy//svPIr9PYGs5UAAQIECORJIPzSmX1wbin769nFPNWlFgIEyi/QHXpDx5tZ9owrv+Vf+yJ2uHXFNxYfrvxuNupHv/ToI39ye3NUMRIgQIAAgfwJhF861y+tLNXT9IlQXWOueS355ulb+atURQQIlFHgl29dOJw0W9/u1dtcPf3DT3747J1e+2wjMAuBzwXfWRRhTgIECBAgQGA0ge7QG58t/EYJIwECkxZo/xxKX/vt+8tJ2vzMHSetVmP15ZMnrkx6fucnMIrA1q3OozzJsQQIECBAgMCMBf52bjFe6e2sZHO9vpRdfGVf5zaPCRAgMAmBJElaP3vxxPmsVd+600TonYS0c45DQPAdh6JzECBAgACBaQsc/vAfrXrz393Ttt+g8KPk+M/Xurf7mgABApMQ6Ay/Qu8khJ1zXAJudR6XpPMQIECAAIEpC2TZL9KND756NG3WD4apH4beb/30oymXYToCBAjUwp9ftD8yFATyKiD45nVl1EWAAAECBIYQiOH3kbS+lgi9Q4g5hAABAgQIECBAgAABAgQKJxCutBSuaAUTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGJC2RZll67dm354sWLhyY+mQkqIZBWoktNEiBAgAABAgQIECBQCIEQeldXV5dbrdaX0zQVfguxavkvMsl/iSokQIDA7gTCP6DhDEmStHZ3Js8mQIAAAQIEJikQQ2878C7GeTY3N7N2CD5//Pjxm3GbkcCoAoLvqGKOJ0CgUALhH9C3L90+Fop+4anHLwu/hVo+xRIgQIBAhQR6hd7YvvAbJYw7FRB8dyrneQQI5F4ght72dd7HQrHt6753hN/cL5sCCRAgQKCCAoNCb+QQfqOEcScCgu9O1DyHAIHcC3SH3liw8BsljAQIECBAIB8Cw4TeWKnwGyWMowp4catRxRxPgEDuBfqF3lB4uPobbn0Ox+S+EQUSIECAAIEKCFy9enVP+9/lfcO02mg0kvn5+QPDHOsYAp0CfvHr1PCYAAECBAgQIECAAIGpChw5cmR9bm7unWaz+Z/tJm4fs7q0tLS63XH2E+gWcKtzt4ivCRAohUC/q75udS7F8mqCAAECBEoocP369fn19fXn6/X6Qq/2Qug9duzYlV77bCOwnYDgu52Q/QQIFFagO/wKvYVdSoUTIECAQEUE+oVfobci3wATbFPwnSCuUxMgMHuBGH5DJV7RefbroQICBAgQILCdQHf4FXq3E7N/GAHBdxglxxAgUGiBEH5DA97Dt9DLqHgCBAgQqJBADL/tlm+4vblCC69VAgQIECBAgAABAgQIVEmg/R/XjSr1q1cCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECuxPIsizZ3Rk8mwABAvkTSPNXkooIECBAgAABAgRmIdAOvel/V1a+c/fVlaOzmN+cBAgQmJSA/9GblKzzEiBAgAABAgQKJPBp6F3ONmuLoexmK1k98PKpKwVqQakECBDoKyD49qWxgwABAgQIECBQDYHu0Bu7Fn6jhJEAgaILuNW56CuofgIECBAgQIDALgT6hd5wynqaPXl3xW3Pu+D1VAIEciLgim9OFkIZBAgQIECAAIFpCwwKvZ21NPe0b3s+5bbnThOPCRAoloArvsVaL9USIECAAAECBMYm8MkbbzwX/6Z30EnrD7In7585tzToGPsIECCQZwHBN8+rozYCBAgQIECAwAQFsvvpx82slW03RZYk63MH997a7jj7CRAgkFcBtzrndWXURYAAAQIECBCYgsDaK7861EofLNeTtOfvhSH0Lhzc/05y8uTaFMoxBQECBCYi0PMH3ERmclICBAgQIECAAIFcCvQLv0JvLpdLUQQI7EBA8N0BmqcQIECAAAECBMom0B1+hd6yrbB+CFRbQPCt9vrrngABAgQIECCwJRDDb5rWN9zevMXiAQECBAgQIECAAAECBAiUSWDt7NnF7M0395WpJ70QIEDgf01Qh63gZYluAAAAAElFTkSuQmCC" alt="Element" class="banner-stars">
        <div class="container1">
          <div class="banner-desc">
            <h2>{{productData.name}}</h2>
            <h6>{{productData.desc}}</h6>
          </div>
        </div>
      </div>
      <el-row style="margin-top:-287px">
        <el-menu theme="dark" :default-active="defaultActive" mode="horizontal" :router="true" class="menu" style="padding:20px;background-color:transparent;padding-right:120px;">
          <el-menu-item index="docs" style="float:right">文档</el-menu-item>
          <el-menu-item index="faqs" style="float:right">FAQ</el-menu-item>
          <el-menu-item index="packages" style="float:right">安装包</el-menu-item>
        </el-menu>
        </el-col>
        <el-col :span="20" style="height: 100%;overflow:auto;width:100%;padding-top:200px">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from "../../config/api";
import env from "../../config/env";
import sessionStorage from "../../config/sessionStore";
import logo from "../common/logo";
import customfooter from "../common/customfooter";
import authentication from "../common/authentication";

export default {
  data() {
    return {
      productData: {
        name: "loading...",
        desc: "loading..."
      }
    };
  },

  components: {
    logo,
    customfooter,
    authentication
  },

  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },

  mounted() {
    this.productId = sessionStorage.getProductId();

    if (this.productId) this.getProductData();
    else this.$router.push("/products");
  },

  methods: {
    getProductData() {
      api
        .getProduct(this.productId)
        .then(res => {
          this.productData = res.data.data;
        })
        .catch(error => {
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
  height: 280px;
  color: #fff;
}

.banner-sky {
  position: absolute;
  top: -150px;
  bottom: -15px;
  width: 100%;
  margin-top: -140px;
  /* transform: skewY(-5deg); */
  transform-origin: center;
  background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4);
}

img.banner-stars {
  position: relative;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.banner .container1 {
  position: relative;
}

.banner-desc {
  padding-top: 00px;
  padding-left: 200px;
  font-size: 46px;
  position: relative;
  top: -30px;
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

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.logoContainer {
  background: #eff5fd;
  border-radius: 60px;
}

.logoContainer img {
  margin: 20px;
  height: 80px;
  width: 80px;
}

.productContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  margin-bottom: 40px;
  width: 350px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 64px;
  padding-bottom: 0px;
  border: 1px solid #eaeefb;
  box-shadow: none;
}

.card:hover {
  transition: all 0.3s ease-in-out;
  transform: translate(0%, -2%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.card h3 {
  margin-top: 64px;
  margin-bottom: 0px;
  font-size: 18px;
  color: #1f2f3d;
  font-weight: 400;
}

.card p {
  font-size: 14px;
  color: #99a9bf;
  margin-bottom: 40px;
}

.bottomOperate {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eaeefb;
  cursor: pointer;
  color: #20a0ff;
  font-size: 14px;
}

.bottomOperate:hover {
  background: #20a0ff;
  color: #ffffff;
}

@media screen and (max-width: 1300px) {
  .banner-desc {
    padding-left: 100px;
  }
}

@media screen and (max-width: 1000px) {
  img.banner-stars {
    display: none;
  }

  .banner-desc {
    top: 119px;
  }
}
</style>
