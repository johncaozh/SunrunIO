<template>
    <div style="min-height:400px">
        <ul class="waterfall">
            <transition-group name="list" tag="p">
                <li v-for="(item, index) in versions" v-bind:key="index">
                    <div class="flexDiv" @click="changeVersion(item)">
                        <span class="date">{{item.time|dateConverter(null)}}</span>
                        <div class="vericalSepector">
                            <div class="node" :class="{'nodeActived':item.actived}" />
                            <div class="vericalDIV" />
                        </div>
                        <div class="vericalDiv">
                            <span class="title">{{item.name}}</span>
                            <p class="desc" v-html="item.desc" />
                        </div>
                    </div>
                </li>
            </transition-group>
        </ul>
        <empty v-show="!loading&&versions.length==0" />
        <loading v-if="loading" />
    </div>
</template>
<script>
import api from "../../../config/api";
import loading from '../../common/loading'
import empty from '../../common/empty'

export default {
    data() {
        return {
            versions: [],
            selectedVersion: null,
            loading: false,
        }
    },

    components: {
        loading,
        empty
    },

    props: {
        productId: {
            required: true,
            default: null,
            type: String,
        },
    },

    mounted() {
        this.getVersions();
    },

    methods: {
        getVersions() {
            if (this.productId) {
                this.loading = true;
                api.getVersions(this.productId)
                    .then(res => {
                        this.loading = false;
                        res.data.data.forEach(v => v.actived = false);
                        this.versions = res.data.data;
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$message.error('获取失败。');
                    });
            }
        },

        changeVersion(version) {
            if (this.selectedVersion)
                this.selectedVersion.actived = false;

            this.selectedVersion = version;
            this.selectedVersion.actived = true;
            this.$emit("versionChanged", this.selectedVersion._id);
        }
    },

    watch: {
        productId: function() {
            this.getVersions();
        },

        versions: function() {
            if (this.versions && this.versions.length > 0)
                this.changeVersion(this.versions[0]);
        }
    }
}
</script>

<style scoped>
li {
    list-style-type: none;
    cursor: pointer;
}

li:hover {
    text-decoration: underline;
}

.list-enter-active,
.list-leave-active {
    transition: all .8s;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}
</style>

