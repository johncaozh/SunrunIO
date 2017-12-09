<template>
    <svg :class="{'hiddenSVG':hidden}">
        <text text-anchor="middle" x="50%" y="65%" class="text text-1">
            Loading
        </text>
        <text text-anchor="middle" x="50%" y="65%" class="text text-2">
            Loading
        </text>
        <text text-anchor="middle" x="50%" y="65%" class="text text-3">
            Loading
        </text>
        <text text-anchor="middle" x="50%" y="65%" class="text text-4">
            Loading
        </text>
    </svg>
</template>
<script>
export default {
    data() {
        return {
            hidden: true,
        }
    },

    props: {
        delay: {
            required: false,
            default: 500,
            type: Number
        }
    },

    mounted() {
        var self = this;
        setTimeout(function() {
            self.hidden = false;
        }, this.delay);
    },

    destroyed() {
        clearTimeout();
    }
}
</script>

<style scoped>
.text {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    fill: none;
    stroke-width: 2px;
    stroke-dasharray: 90 310;
    animation: stroke 6s infinite linear;
}

.text-1 {
    stroke: #3498db;
    text-shadow: 0 0 5px #3498db;
    animation-delay: -1.5s;
}

.text-2 {
    stroke: #f39c12;
    text-shadow: 0 0 5px #f39c12;
    animation-delay: -3s;
}

.text-3 {
    stroke: #e74c3c;
    text-shadow: 0 0 5px #e74c3c;
    animation-delay: -4.5s;
}

.text-4 {
    stroke: #9b59b6;
    text-shadow: 0 0 5px #9b59b6;
    animation-delay: -6s;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: -400;
    }
}

svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    height: 80px;
    width: 160px;
}

.hiddenSVG {
    display: none;
}
</style>

