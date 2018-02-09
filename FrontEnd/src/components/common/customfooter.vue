<template>
    <div class="footer">
        <div class="footer-main">
            <p class="footer-main-title">SunrunIO V0.0.1</p>
            <a href="https://github.com/vuejs/vue" target="_blank" class="footer-main-link">Vue.js</a>
            <a href="https://github.com/ElemeFE/element" target="_blank" class="footer-main-link">Element.js</a>
        </div>
        <div class="footer-social">
            <el-popover ref="popover1" placement="top" width="160" trigger="hover">
                <div>
                    <h3 class="pophoverH3">微信公众号</h3>
                    <img src="../../../dist/img/wechatQR.jpg" style="width:160px;height:160px" />
                </div>
            </el-popover>
            <span>
                <i class="icon-el-icon-wechat elementdoc" v-popover:popover1/>
                <a href="http://www.gzsunrun.cn/" target="_blank" style="margin-left:20px" title="Sunrun官网">
                    <i class="icon-el-icon-solid-sunrun elementdoc" />
                </a>
            </span>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.footer {
    height: 100px;
    background-color: #324057;
    color: #a4aebd;
    z-index: 1000;
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.footer .footer-main {
    font-size: 0;
    display: inline-block;
}

.footer .footer-main .footer-main-title {
    line-height: 1;
    font-size: 22px;
    margin: 0;
}

.footer .footer-main .footer-main-link {
    display: inline-block;
    margin: 12px 18px 0 0;
    line-height: 1;
    font-size: 12px;
    color: #768193;
}

.footer .footer-social {
    float: right;
}

.footer .footer-social .elementdoc {
    transition: .3s;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    color: #8d99ab;
    background-color: transparent;
    width: 32px;
    height: 32px;
    font-size: 32px;
    vertical-align: middle;
}

.footer .footer-social .elementdoc:hover {
    transform: scale(1.2, 1.2)
}

.pophoverH3 {
    text-align: center;
}

@media screen and (max-width:1000px) {
    .footer {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>

