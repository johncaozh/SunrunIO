<template>
    <div>
        <div class="headerDiv">
            <logo class="logo"  />
        </div>
        <router-view>

        </router-view>
    </div>
</template>

<script>
import logo from '../common/logo'
export default {
    components: {
        logo
    }
}
</script>

<style scoped>
router-viewer {
    align-self: stretch;
}
</style>

    