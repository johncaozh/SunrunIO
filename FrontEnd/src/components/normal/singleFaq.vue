<template>
    <div class="horizontalDiv root">
        <transition name="main">
            <div v-if="data">
                <h1>{{data.name}}</h1>
                <p v-html="data.desc"></p>
            </div>
        </transition>
        <empty v-show="data==null&&!loading" content="这里的东西被外星人偷走了" />
        <loading v-if="loading" />
    </div>
</template>

<script>
import api from '../../config/api'
import fileIcon from '../common/fileIcon'
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
        fileIcon,
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
            api.getFaq(this.id)
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
    /* justify-content: center; */
    margin-left: 20px;
    align-items: flex-start
}

.main-enter-active {
    transition: all 1.2s
}

.main-enter {
    transform: scale(0.5);
}
</style>

    