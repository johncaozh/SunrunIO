<template>
    <svg>
        <use :xlink:href="'#'+osType.toLowerCase()"></use>
    </svg>
</template>
<script>
import env from '../../config/env'
export default {
    props: {
        os: {
            required: true,
            default: null,
            type: String
        },
    },

    computed: {
        osType: function() {
            var self = this;
            var target = env.constants.presetOSs.find(item => item.value === self.os);

            if (target)
                return this.os.toLowerCase();

            return "other"
        }
    }
}
</script>

<style scoped>

</style>

