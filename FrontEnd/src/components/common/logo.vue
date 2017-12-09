<template>
    <div class="home" @click="goHome">
        <img src="../../../dist/svg/logo.svg" style="width:48px;height:48px" />
        <svg style="height:90px;width:250px">
            <text text-anchor="middle" x="50%" y="65%" class="text text-1">
                SunrunIO
            </text>
            <text text-anchor="middle" x="50%" y="65%" class="text text-2">
                SunrunIO
            </text>
            <text text-anchor="middle" x="50%" y="65%" class="text text-3">
                SunrunIO
            </text>
            <text text-anchor="middle" x="50%" y="65%" class="text text-4">
                SunrunIO
            </text>
        </svg>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    }
  },

  methods: {
    goHome() {
      this.$router.push(this.value == 0 ? "/products" : "/manager/products");
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 42px;
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

.home {
  cursor: pointer;
}
</style>

