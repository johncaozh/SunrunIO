<template>
    <div class="horizontalDiv root">
        <transition name="main">
            <el-card class="card" style="min-width:300px" :body-style="{ padding: '0px' }" v-if="data">
                <div class="verticalDiv">
                    <div class="circleDiv">
                        <os-platform :os="data._platform.os" style="width:64px;height:64px" />
                    </div>
                    <h3>{{data._platform.name}}
                    </h3>
                    <p style="line-height:20px;text-align:center">
                        V{{data.version}}
                        <br/> {{data.size|sizeUnitConverter(data.size)}}
                        <br/>{{data.publishDate|dateConverter(null)}}
                    </p>
                    <div class="bottomOperate" @click="download(data._id)">
                        立即下载
                    </div>
                </div>
            </el-card>
        </transition>
        <transition name="desc">
            <div class="verticalDiv desc" v-if="data">
                <h4 style="text-align:left;margin-bottom:0px;margin-top:0px">更新日志</h4>
                <p v-html="data.desc" style="margin-top:0px" />
            </div>
        </transition>
        <empty v-show="data==null&&!loading" content="这里的东西被外星人偷走了" />
        <loading v-if="loading" />
    </div>
</template>

<script>
import api from '../../config/api'
import osPlatform from '../common/osPlatform'
import download from '../../config/mixin/download'
import loading from '../common/loading'
import empty from '../common/empty'

export default {
    mixins: [download],
    data() {
        return {
            id: null,
            data: null,
            loading: false,
        }
    },

    components: {
        osPlatform,
        loading,
        empty,
    },

    mounted() {
        this.id = this.$route.params.id;
        this.getData();
    },

    methods: {
        getData() {
            this.data = null;
            this.loading = true;
            api.getPackage(this.id)
                .then(res => {
                    this.data = res.data.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error('获取失败。');
                });
        }
    }
}
</script>

<style scoped>
.root {
    margin-top: 100px;
    justify-content: center;
    align-items: flex-start
}

.desc {
    align-items: flex-start;
    margin-left: 30px;
}

.main-enter-active {
    transition: all 1.2s
}

.main-enter {
    transform: translateX(100%) scale(1.1);
}

.desc-enter-active {
    transition: all 1.2s
}

.desc-enter {
    opacity: 0;
    transform: scale(0.5);
}
</style>

    